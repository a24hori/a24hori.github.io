const translations = {
	ja: {
		title: "堀篤史のウェブサイト",
		profile: "プロフィール",
		name: "名前: 堀 篤史",
		affiliation: "所属: 国立大学法人 名古屋工業大学 大学院工学研究科",
		field: "専門分野: 数理最適化，非線形最適化理論の均衡問題への応用（ナッシュ均衡問題，ロバスト均衡問題），包絡分析法（DEA），階層分析法（AHP），ネットワーク分析法（ANP），スケジューリング",
		news: "ニュース",
		publications: "研究業績",
		"under-review": "投稿中",
		presentations: "発表実績",
		invited: "招待講演",
		"talks-in-english": "国際学会での発表",
		"talks-in-japanese": "国内学会での発表",
		experience: "職歴",
		education: "学歴",
		doctor: '2020年4月–2023年3月：京都大学 大学院情報学研究科 数理工学専攻（情報学博士）<a href="https://repository.kulib.kyoto-u.ac.jp/dspace/handle/2433/283860">博士論文</a>',
		master: '2016年4月–2018年3月：南山大学 大学院理工学研究科 システム数理専攻',
		bachelor: '2012年4月–2016年3月：南山大学 情報理工学部 情報システム数理学科',
		nitech: '2025年4月–現在：国立大学法人 名古屋工業大学 大学院工学研究科 助教',
		seikei: "2023年4月–2025年3月：成蹊大学 理工学部 助教", 
		solo: "2020年4月–2021年12月：個人事業主として従事",
		mitsubishi: "2018年4月–2020年3月：三菱電機株式会社",
		academic: "参加学会",
		orsj: "日本オペレーションズ・リサーチ学会",
		siam: "SIAM (Society for Industrial and Applied Mathematics)",
		mos: "Mathematical Optimization Society",
		committee: "委員歴",
		award: "表彰歴",
		contact: "連絡先",
		email: "メール: atsushi-hori [*] st.seikei.ac.jp",
		diary: "ショートブログ",
		"menu-toc": "目次",
		"menu-profile": "プロフィール",
		"menu-news": "ニュース",
		"menu-publications": "研究業績",
		"menu-presentations": "発表実績",
		"menu-experience": "職歴",
		"menu-education": "学歴",
		"menu-academic": "参加学会",
		"menu-committee": "委員歴",
		"menu-award": "表彰歴",
		"menu-contact": "連絡先",
	},
	en: {
		title: "Atsushi Hori's Website",
		profile: "Profile",
		name: "Name: Atsushi Hori",
		affiliation: "Affiliation: Graduate School of Engineering, Nagoya Institute of Technology",
		field: "Field: Mathematical Optimization, Application of nonlinear optimization theory into equilibrium problems (e.g., Nash equilibrium problem, robust equilibrium problem), Data envelopment analysis (DEA), Analytic hierarchy process (AHP), Analytic network process (ANP), Scheduling",
		news: "News",
		publications: "Publications",
		"under-review": "Under review",
		presentations: "Presentations",
		invited: "Invited",
		"talks-in-english": "Talks in English",
		"talks-in-japanese": "Talks in Japanese",
		experience: "Work Experience",
		education: "Education",
		doctor: 'Doctor of Informatics, the Graduate School of Informatics, Kyoto University, Kyoto, Japan, 2023 (<a href="https://repository.kulib.kyoto-u.ac.jp/dspace/handle/2433/283860">Doctoral thesis</a>)',
		master: 'Master of Mathematical Science, the Graduate School of Science and Engineering, Nanzan University, Nagoya, Japan, 2018',
		bachelor: 'Bachelor of Science and Engineering, Nanzan University, Nagoya, Japan, 2016',
		nitech: "April 2025–Present: Assistant Professor at Graduate School of Engineering, Nagoya Institute of Technology",
		seikei: "April 2023–March 2025: Assistant Professor at Faculty of Science and Technology, Seikei University,",
		solo: "April 2020–December 2021: Work as a sole proprietor (development of applications using mathematical optimization techniques and machine learning algorithms)",
		mitsubishi: "April 2018–March 2020: Mitsubishi Electric Corporation",
		academic: "Academic Memberships",
		orsj: "The Operations Research Society of Japan (ORSJ)",
		siam: "SIAM (Society for Industrial and Applied Mathematics)",
		mos: "Mathematical Optimization Society",
		committee: "Committee Activities",
		award: "Awards",
		contact: "Contact",
		email: "Email: atsushi-hori [*] st.seikei.ac.jp",
		diary: "Short blog (in Japanese)",
		"menu-toc": "Table of Contents",
		"menu-profile": "Profile",
		"menu-news": "News",
		"menu-publications": "Publications",
		"menu-presentations": "Presentations",
		"menu-experience": "Work Experience",
		"menu-education": "Education",
		"menu-academic": "Academic Memberships",
		"menu-committee": "Committee Activities",
		"menu-award": "Awards",
		"menu-contact": "Contact",
	}
};

function switchLanguage(lang) {
	console.log(`Switching language to: ${lang}`); // dbug
	document.querySelectorAll("[id]").forEach(element => {
		const key = element.id;
		const translation = translations[lang][key];

		if (!translation) {
			console.warn(`Missing translation for: ${key}`);
		} else {
			if (/<[a-z][\s\S]*>/i.test(translation)) {
				element.innerHTML = translation;
			} else {
				element.textContent = translation;
			}
		}
	});
	localStorage.setItem("language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
	let savedLang = localStorage.getItem("language") || navigator.language.slice(0, 2);
	if (!translations[savedLang]) {
		savedLang = "ja";
	}
	switchLanguage(savedLang);
});
