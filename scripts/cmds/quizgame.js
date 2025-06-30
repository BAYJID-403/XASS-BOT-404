if (!global.GoatBot) global.GoatBot = {};
if (!global.GoatBot.userData) global.GoatBot.userData = {};
if (!global.GoatBot.onReply) global.GoatBot.onReply = new Map();

module.exports = {
  config: {
    name: "quiz",
    version: "4.0",
    author: "BaYjid",
    countDown: 3,
    role: 0,
    shortDescription: "বাংলা মাল্টিপল চয়েস কুইজ গেম",
    longDescription: "প্রশ্নের নিচে ৩টি অপশন দেখাবে, সঠিকটি বেছে নাও ও পয়েন্ট সংগ্রহ করো",
    category: "game",
    guide: "{pn}"
  },

  onStart: async function ({ message, event }) {
    const questions = [
      { q: "বাংলাদেশের জাতীয় ফুল কী?", options: ["শাপলা", "জবা", "গোলাপ"], answer: "শাপলা" },
      { q: "বাংলাদেশ স্বাধীনতা লাভ করে কোন সালে?", options: ["১৯৭১", "১৯৬৫", "১৯৮১"], answer: "১৯৭১" },
      { q: "রবীন্দ্রনাথ ঠাকুর কোন পুরস্কার পেয়েছিলেন?", options: ["নোবেল", "পুলিত্জার", "অস্কার"], answer: "নোবেল" },
      { q: "বাংলাদেশের জাতীয় সঙ্গীতের নাম কী?", options: ["আমার সোনার বাংলা", "চাঁদের হাসি", "বঙ্গবন্ধু"], answer: "আমার সোনার বাংলা" },
      { q: "পৃথিবীর সবচেয়ে বড় মহাসাগরের নাম কী?", options: ["প্রশান্ত মহাসাগর", "আটলান্টিক", "ভারতীয় মহাসাগর"], answer: "প্রশান্ত মহাসাগর" },
      { q: "পৃথিবীর সবচেয়ে বড় গ্রহ কোনটি?", options: ["বৃহস্পতি", "শনি", "পৃথিবী"], answer: "বৃহস্পতি" },
      { q: "প্রথম মানব চাঁদে কত সালে নামেন?", options: ["১৯৬৯", "১৯৫৯", "১৯৭২"], answer: "১৯৬৯" },
      { q: "তিন রঙের জাতীয় পতাকা কোন দেশের?", options: ["বাংলাদেশ", "ভারত", "বাংলাদেশ নয়"], answer: "বাংলাদেশ নয়" },
      { q: "বাংলাদেশের জাতীয় কবি কে?", options: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীম উদ্দীন"], answer: "কাজী নজরুল ইসলাম" },
      { q: "সর্বপ্রথম বিশ্বযুদ্ধ কখন শুরু হয়?", options: ["১৯১৪", "১৯৩৯", "১৯১৮"], answer: "১৯১৪" },
      { q: "মানবদেহে কতটি রক্তের গ্রুপ আছে?", options: ["৪", "৫", "৩"], answer: "৪" },
      { q: "বাংলাদেশের জাতীয় খেলা কী?", options: ["কাবাডি", "ক্রিকেট", "ফুটবল"], answer: "কাবাডি" },
      { q: "পদ্মা সেতুর দৈর্ঘ্য কত?", options: ["৬.১৫ কিমি", "৫.৫০ কিমি", "৭.২০ কিমি"], answer: "৬.১৫ কিমি" },
      { q: "বাংলাদেশের রাজধানী কোথায়?", options: ["ঢাকা", "চট্টগ্রাম", "খুলনা"], answer: "ঢাকা" },
      { q: "রবীন্দ্রনাথ ঠাকুরের কোন গানের মাধ্যমে বাংলাদেশ স্বাধীনতা যুদ্ধের প্রেরণা পেয়েছিল?", options: ["আমার সোনার বাংলা", "চল চল চল", "জনগণমন"], answer: "আমার সোনার বাংলা" },
      { q: "বাংলাদেশের সর্বোচ্চ পর্বত কোনটি?", options: ["কাঞ্চনজঙ্ঘা", "মেহেরপুর", "সেলিম"], answer: "কাঞ্চনজঙ্ঘা" },
      { q: "বাংলাদেশের জাতীয় ফল কী?", options: ["কাঁঠাল", "আম", "লিচু"], answer: "কাঁঠাল" },
      { q: "বাংলাদেশের জাতীয় পাখি কোনটি?", options: ["দোয়েল", "ময়ূর", "বাজ"], answer: "দোয়েল" },
      { q: "বাংলাদেশের স্বাধীনতা দিবস কখন?", options: ["২৬ মার্চ", "১৬ ডিসেম্বর", "২১ ফেব্রুয়ারি"], answer: "২৬ মার্চ" },
      { q: "বাংলাদেশের জাতীয় পশু কোনটি?", options: ["রাজধানী বাঘ", "হাতি", "সিংহ"], answer: "রাজধানী বাঘ" },
      { q: "বাংলাদেশের প্রধান নদী কোনটি?", options: ["পদ্মা", "যমুনা", "মেঘনা"], answer: "পদ্মা" },
      { q: "বাংলাদেশের জাতীয় ভাষা কোনটি?", options: ["বাংলা", "উর্দু", "অর্দু"], answer: "বাংলা" },
      { q: "বাংলাদেশের জাতীয় স্মৃতি স্মরণ দিবস কবে?", options: ["২১ ফেব্রুয়ারি", "২৬ মার্চ", "১৬ ডিসেম্বর"], answer: "২১ ফেব্রুয়ারি" },
      { q: "বাংলাদেশের মুক্তিযুদ্ধ কত সালে শুরু হয়?", options: ["১৯৭১", "১৯৭০", "১৯৬৯"], answer: "১৯৭১" },
      { q: "বাংলাদেশের জাতীয় সংগীত কে লিখেছেন?", options: ["রবীন্দ্রনাথ ঠাকুর", "কাজী নজরুল ইসলাম", "জসীম উদ্দীন"], answer: "রবীন্দ্রনাথ ঠাকুর" },
      { q: "বাংলাদেশের সর্ববৃহৎ জেলা কোনটি?", options: ["রাঙ্গামাটি", "কক্সবাজার", "খুলনা"], answer: "রাঙ্গামাটি" },
      { q: "বাংলাদেশের প্রথম রাষ্ট্রপতি কে ছিলেন?", options: ["শেখ মুজিবুর রহমান", "খালেদা জিয়া", "যশোর"], answer: "শেখ মুজিবুর রহমান" },
      { q: "বাংলাদেশের জাতীয় বৃক্ষ কোনটি?", options: ["আমলকী", "শের", "মহাগুনি"], answer: "আমলকী" },
      { q: "বাংলাদেশের প্রধান নদীগুলোর মধ্যে কোনটি নেই?", options: ["গঙ্গা", "মেঘনা", "পদ্মা"], answer: "গঙ্গা" },
      { q: "বাংলাদেশের সর্বশেষ বিভাগ কোনটি?", options: ["রংপুর", "ময়মনসিংহ", "খুলনা"], answer: "রংপুর" },
      { q: "বাংলাদেশের জাতীয় প্রজাতন্ত্র কোনটি?", options: ["গণপ্রজাতন্ত্রী বাংলাদেশ", "বাংলাদেশ রাজতন্ত্র", "বাংলাদেশ ফেডারেশন"], answer: "গণপ্রজাতন্ত্রী বাংলাদেশ" },
      { q: "বাংলাদেশের জাতীয় ক্রীড়া কোনটি?", options: ["কাবাডি", "ক্রিকেট", "ফুটবল"], answer: "কাবাডি" },
      { q: "বাংলাদেশের সবচেয়ে বড় শহর কোনটি?", options: ["ঢাকা", "চট্টগ্রাম", "খুলনা"], answer: "ঢাকা" },
      { q: "বাংলাদেশের জাতীয় পতাকার রঙ কী?", options: ["সবুজ ও লাল", "নীল ও সাদা", "সবুজ ও হলুদ"], answer: "সবুজ ও লাল" },
      { q: "বাংলাদেশের জাতীয় সিংহ কোনটি?", options: ["বাঘ", "সিংহ", "হাতি"], answer: "বাঘ" },
      { q: "বাংলাদেশের প্রথম প্রধানমন্ত্রী কে ছিলেন?", options: ["শেখ মুজিবুর রহমান", "খালেদা জিয়া", "রওশন এরশাদ"], answer: "শেখ মুজিবুর রহমান" },
      { q: "বাংলাদেশের জাতীয় কবি কে?", options: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীম উদ্দীন"], answer: "কাজী নজরুল ইসলাম" },
      { q: "বাংলাদেশের জাতীয় পতাকা কবে গ্রহণ করা হয়?", options: ["১৯৭১", "১৯৭২", "১৯৭৩"], answer: "১৯৭১" },
      { q: "বিশ্বের সবচেয়ে বড় সাগর কোনটি?", options: ["প্রশান্ত মহাসাগর", "আটলান্টিক মহাসাগর", "ভারতীয় মহাসাগর"], answer: "প্রশান্ত মহাসাগর" },
      { q: "মানবদেহে কতটি রক্তের গ্রুপ আছে?", options: ["৪", "৫", "৩"], answer: "৪" },
      { q: "বাংলাদেশের সবচেয়ে বড় জেলা কোনটি?", options: ["রাঙ্গামাটি", "চট্টগ্রাম", "সিলেট"], answer: "রাঙ্গামাটি" },
      { q: "বাংলাদেশের জাতীয় ফুলের নাম কী?", options: ["শাপলা", "জবা", "গোলাপ"], answer: "শাপলা" },
      { q: "বাংলাদেশের জাতীয় সংগীত কে লিখেছেন?", options: ["রবীন্দ্রনাথ ঠাকুর", "কাজী নজরুল ইসলাম", "জসীম উদ্দীন"], answer: "রবীন্দ্রনাথ ঠাকুর" },
      { q: "বাংলাদেশের জাতীয় পশু কোনটি?", options: ["বাঘ", "সিংহ", "হাতি"], answer: "বাঘ" },
      { q: "বাংলাদেশের জাতীয় পাখি কোনটি?", options: ["দোয়েল", "ময়ূর", "বাজ"], answer: "দোয়েল" },
      { q: "বাংলাদেশের প্রধান শহর কোনটি?", options: ["ঢাকা", "চট্টগ্রাম", "খুলনা"], answer: "ঢাকা" },
      { q: "বাংলাদেশের সবচেয়ে বড় নদী কোনটি?", options: ["পদ্মা", "যমুনা", "মেঘনা"], answer: "পদ্মা" }
    ];

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    const picked = questions[Math.floor(Math.random() * questions.length)];
    const shuffledOptions = shuffle([...picked.options]);

    let optionsText = "";
    shuffledOptions.forEach((opt, idx) => {
      optionsText += `\n${idx + 1}. ${opt}`;
    });

    await message.reply(`❓ ${picked.q}\n\nঅপশন গুলো থেকে সঠিক নম্বরটি টাইপ করো:${optionsText}`, (err, info) => {
      if (err) return console.error(err);
      global.GoatBot.onReply.set(info.messageID, {
        commandName: "quiz",
        question: picked.q,
        answer: picked.answer,
        options: shuffledOptions,
        userID: event.senderID || message.senderID
      });
    });
  },

  onReply: async function ({ event, message }) {
    const replyTo = event.messageReply?.messageID || event.messageReplyMessageID || null;
    if (!replyTo) return;

    const data = global.GoatBot.onReply.get(replyTo);
    if (!data) return;

    const userText = event.body ? event.body.trim() : "";
    const userAnswerIndex = parseInt(userText);

    if (isNaN(userAnswerIndex) || userAnswerIndex < 1 || userAnswerIndex > data.options.length) {
      return message.reply("⚠️ দয়া করে ১ থেকে ৩ এর মধ্যে একটি সংখ্যা টাইপ করুন।");
    }

    const userAnswer = data.options[userAnswerIndex - 1];
    const userID = event.senderID || data.userID;

    if (!global.GoatBot.userData[userID]) {
      global.GoatBot.userData[userID] = { balance: 0 };
    }
    const userData = global.GoatBot.userData[userID];

    if (userAnswer === data.answer) {
      userData.balance += 10;
      await message.reply(`✅ সঠিক উত্তর!\n🎉 তোমার ব্যালেন্স: ${userData.balance} পয়েন্ট`);
    } else {
      await message.reply(`❌ ভুল! সঠিক উত্তর হল: ${data.answer}\n🎉 তোমার ব্যালেন্স: ${userData.balance} পয়েন্ট`);
    }

    global.GoatBot.onReply.delete(replyTo);
  }
};