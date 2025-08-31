from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_newme_product_data(driver, wait, product_url):
    try:
        driver.get(product_url)
        print(f"\n⚙️ Processing URL: {product_url}")

        # --- Explicit wait for product info container (title + price) ---
        info_container = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.mb-\\[12px\\]"))
        )

        # Product Title
        title = info_container.find_element(By.TAG_NAME, "h1").text.strip()

        # Product Price
        price_container = info_container.find_element(By.CSS_SELECTOR, "div.flex.items-center.w-fit")
        price = price_container.find_element(By.TAG_NAME, "div").text.strip()

        # --- Explicit wait for swiper wrapper (images) ---
        swiper = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "swiper-wrapper"))
        )

        slides = swiper.find_elements(By.CLASS_NAME, "swiper-slide")
        img_urls = []

        for slide in slides:
            imgs = slide.find_elements(By.TAG_NAME, "img")
            for img in imgs:
                src = img.get_attribute("src")
                if src:
                    img_urls.append(src)

        return title, price, list(set(img_urls))  # remove duplicates

    except Exception as e:
        print(f"❌ Error processing {product_url}: {e}")
        return None, None, []


# --- MAIN PROGRAM ---
# Ask user first for URLs
def newme(a):
    urls = a
    data2 = []

    # --- Then open browser ---
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 10)  # max 10 seconds for explicit waits

    try:
        # Process each URL
        for idx, url in enumerate(urls, 1):
            title, price, image_urls = get_newme_product_data(driver, wait, url)

            # merge price into title neatly
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
                print(f"🖼 Found {len(image_urls)} product image URLs:\n")
                for i, img in enumerate(image_urls, 1):
                    print(f"{i}. {img}\n")
            else:
                print("❌ No product images found.")

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
