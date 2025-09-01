from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import re


def fetch_images_from_url(driver, product_url):
    driver.get(product_url)

    print("⚙️ Waiting for JS to render...")
    time.sleep(6)

    driver.execute_script("window.scrollBy(0, 800);")
    time.sleep(2)

    # Optional: scroll a bit further if needed
    driver.execute_script("window.scrollBy(0, 300);")
    time.sleep(1)

    # Scroll back to top (simulate user scroll)
    driver.execute_script("window.scrollTo(0, 0);")
    time.sleep(1)

    # Get product title and name
    try:
        title = driver.find_element(By.CLASS_NAME, "pdp-title").text.strip()
    except:
        title = ""

    try:
        name = driver.find_element(By.CLASS_NAME, "pdp-name").text.strip()
    except:
        name = ""

    full_name = f"{title} {name}".strip()

    # Get Images
    image_divs = driver.find_elements(By.CLASS_NAME, "image-grid-image")
    urls = []

    for div in image_divs:
        style = div.get_attribute("style")
        match = re.search(r'url\(\"(.*?)\"\)', style)
        if match:
            url = match.group(1)
            # 🔁 Upscale to 1440x1080
            url = url.replace("h_720", "h_1440").replace("w_540", "w_1080")
            if "assets.myntassets.com" in url:
                urls.append(url)
    return full_name, list(set(urls))

def myntra(a):
    product_urls = a
    data2 = []

    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    driver = webdriver.Chrome(options=options)

    try:
        all_images = {}

        for i, url in enumerate(product_urls):
            print(f"\n🔍 Fetching images for product {i+1}...")
            full_name, images = fetch_images_from_url(driver, url)
            all_images[url] = (full_name,images)
            print(f"✅ Found {len(images)} images")

        print("\n🎯 All results:\n")

        for i, (url, data) in enumerate(all_images.items(), 1):
            full_name, imgs = data
            print(f"URL{i} : {url}")
            print(f"TITLE : {full_name}")
            var_images=[]
            for j, img in enumerate(imgs, 1):
                var_images.append(f"{img}")
                print(f"{j}. {img}")
            print()  # One extra line for spacing
            dict={"url" : url,"title": full_name,"images":var_images}
            data2.append(dict)

        return data2


    finally:
        driver.quit()

if __name__ == "__main__":
    myntra()
