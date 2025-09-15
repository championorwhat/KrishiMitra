import os
import json
import google.generativeai as genai
from googletrans import Translator
from fuzzywuzzy import process, fuzz

# ✅ Load JSON data
def load_data():
    try:
        with open(r'C:\Users\Abhilove Goyal\Desktop\CHATBOTT\CSI.json', "r", encoding="utf-8") as file:
            data = json.load(file)
            print("✅ JSON loaded with", sum(len(v) for v in data.values()), "questions.")
            return data
    except Exception as e:
        print(f"❌ Error loading JSON: {e}")
        return {}
data = load_data()
translator = Translator()

# ✅ Setup Gemini
genai.configure(api_key=os.getenv("GENAI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

# ✅ Translation
def translate_text(text, target="en"):
    try:
        return translator.translate(text, dest=target).text
    except:
        return text

# ✅ Gemini
def get_gemini_response(prompt, user_lang):
    try:
        response = model.generate_content(prompt)
        return translate_text(response.text, user_lang)
    except:
        return translate_text("Sorry, I couldn't answer that right now.", user_lang)

# ✅ JSON fuzzy matching
def get_json_answer(query):
    questions, answers = [], []
    for faqs in data.values():
        for faq in faqs:
            questions.append(faq.get("question", "").lower())
            answers.append(faq.get("answer", ""))

    match = process.extractOne(query.lower(), questions, scorer=fuzz.token_sort_ratio)
    if match:
        matched_q, score = match
        print(f"🔍 Matched: '{matched_q}' with score {score}")
        if score >= 70:
            return answers[questions.index(matched_q)]
    return None

# ✅ Main fetch
# ✅ Main logic
# ✅ Main logic (Updated)
def fetch_answer(user_query, user_lang="en"):
    translated_query = translate_text(user_query, "en")
    query_lower = translated_query.lower()

    # ✅ Step 1: Check tech keywords first
    tech_keywords = ["crop", "soil", "fertilizer", "pesticide", "irrigation", "weather", "yield", "agriculture", "farming","harvest","farm","cultivation","agro","agri","farmers","farms","rice","wheat","maize","corn","barley","millet","sorghum","oats","rye","legumes","pulses","vegetables","fruits","orchards","vineyards"]
    if any(keyword in query_lower for keyword in tech_keywords):
        return get_gemini_response(translated_query + " answer in 40 words", user_lang)

    # ✅ Step 2: JSON fuzzy match (ONLY if not tech)
    json_answer = get_json_answer(translated_query)
    if json_answer:
        return translate_text(json_answer, user_lang)

    # ❌ Step 3: Fallback if both fail
    fallback = (
        "🤔 I'm not sure about that. Try asking:\n"
        "• How to improve soil fertility ?\n"
        "• How do I know the crop is ready to harvest?\n"
        "• What fertilizers should i use for wheat crops?"
    )
    return translate_text(fallback, user_lang)

# ✅ Runner
def chatbot(user_input, user_lang="en"):
    return fetch_answer(user_input, user_lang)

# ✅ CLI tester
if __name__ == "__main__":
    print("Bot: Hello! Ask anything about CSI (Multilingual supported 🧠)")
    while True:
        user_query = input("You: ")
        if user_query.lower() in ["exit", "quit"]:
            print("Bot: Goodbye! 👋")
            break
        user_lang = input("Language (e.g., en, hi): ").strip()
        print("Bot:", chatbot(user_query, user_lang))
