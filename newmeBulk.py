import logging
import tempfile
from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# ==============================
# Logging setup
# ==============================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(),                # logs to Render console
        logging.FileHandler("selenium.log")     # logs also saved to file
    ]
)


def get_newme_product_data(driver, wait, product_url):
    try:
        driver.get(product_url)
        logging.info(f"⚙️ Processing URL: {product_url}")

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
        logging.error(f"❌ Error processing {product_url}: {e}")
        return None, None, []


def newme(a):
    urls = a
    data2 = []

    logging.info("🚀 Starting Chrome for Newme scraping...")

    try:
        chrome_options = Options()
        chrome_options.add_argument("--headless=new")   # headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-software-rasterizer")
        chrome_options.add_argument("--window-size=1920x1080")

        # create a unique temporary user data dir
        tmp_user_data_dir = tempfile.mkdtemp()
        chrome_options.add_argument(f"--user-data-dir={tmp_user_data_dir}")

        driver = webdriver.Chrome(options=chrome_options)
        wait = WebDriverWait(driver, 10)  # max 10 seconds per wait

    except WebDriverException as e:
        logging.error(f"❌ Failed to start Chrome: {e}")
        return []

    try:
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

            logging.info(f"================ Product {idx} =================")
            if full_title:
                logging.info(f"✅ Product Title: {full_title}")

            if image_urls:
                logging.info(f"🖼 Found {len(image_urls)} product image URLs")
            else:
                logging.warning("❌ No product images found.")

            product_dict = {
                "title": full_title,
                "url": url,
                "images": image_urls if image_urls else []
            }
            data2.append(product_dict)

    finally:
        driver.quit()
        logging.info("🛑 Chrome closed.")

    return data2
