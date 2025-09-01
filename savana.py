from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

def get_savana_product_data(driver, wait, product_url):
    try:
        driver.get(product_url)
        print(f"\n⚙️ Processing URL: {product_url}")

        # --- Wait for title ---
        title_tag = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "Title--title--FSHPbGu"))
        )
        title = title_tag.text.strip()

        # --- Wait for price ---
        price_tag = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "Price--price--NCZ2nDP"))
        )
        price = price_tag.text.strip()

        # --- Wait for all slides ---
        slides = wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "slick-slide"))
        )

        first_color_id = None
        img_urls = []
        available_color_ids = set()

        for slide in slides:
            try:
                pic_area = slide.find_element(By.CLASS_NAME, "NewImages_M--picArea--O98ayHg")
                data_bee_click = pic_area.get_attribute("data-bee-click")
                data_json = json.loads(data_bee_click.replace("&quot;", '"'))
                color_id = data_json.get("extend", {}).get("colorId")
                available_color_ids.add(color_id)

                if first_color_id is None:
                    first_color_id = color_id
                elif color_id != first_color_id:
                    # Reached a different variant → stop
                    break

                img_tag = pic_area.find_element(By.CSS_SELECTOR, "div.ub-image.NewImages_M--image--N0B9kSk img")
                src = img_tag.get_attribute("src")
                if src:
                    img_urls.append(src)

            except:
                continue

        return title, price, list(set(img_urls)), list(available_color_ids)

    except Exception as e:
        print(f"❌ Error processing {product_url}: {e}")
        return None, None, [], []


# --- MAIN PROGRAM ---
def savana(a):
    urls = a
    data2 = []

    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 20)  # max 10 seconds

    try:
        for idx, url in enumerate(urls, 1):
            title, price, image_urls, color_ids = get_savana_product_data(driver, wait, url)

            # Merge price into title nicely
            if title and price:
                full_title = f"{title} – {price}"
            elif title:
                full_title = title
            elif price:
                full_title = price
            else:
                full_title = ""

            print(f"\n================ Product {idx} =================")
            if full_title:
                print(f"✅ Product Title: {full_title}")

            if image_urls:
                print(f"🖼 Found {len(image_urls)} images for the first variant (colorId: {color_ids[0]}):\n")
                for i, img in enumerate(image_urls, 1):
                    print(f"{i}. {img}\n")
            else:
                print("❌ No product images found.")

            if color_ids:
                print(f"🎨 Available colorIds for this product: {color_ids}")

            # --- Save result in data2 ---
            product_dict = {
                "title": full_title,
                "url": url,
                "images": image_urls if image_urls else []
            }
            data2.append(product_dict)

    finally:
        driver.quit()

    return data2

