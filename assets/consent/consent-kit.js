//#region src/consent/banner.ts
function e(e, n) {
	if (typeof document > "u") return null;
	t();
	let r = document.createElement("section");
	return r.className = "ck-banner", r.setAttribute("role", "region"), r.setAttribute("aria-label", e.bannerTitle), r.innerHTML = `
    <div class="ck-banner__content">
      <h2>${e.bannerTitle}</h2>
      <p>${e.bannerDescription}</p>
    </div>
    <div class="ck-banner__actions">
      <button type="button" class="ck-button ck-button--primary" data-ck-accept>${e.acceptAll}</button>
      <button type="button" class="ck-button ck-button--secondary" data-ck-reject>${e.reject}</button>
      <button type="button" class="ck-button ck-button--ghost" data-ck-preferences>${e.preferences}</button>
    </div>
  `, r.querySelector("[data-ck-accept]")?.addEventListener("click", n.onAcceptAll), r.querySelector("[data-ck-reject]")?.addEventListener("click", n.onReject), r.querySelector("[data-ck-preferences]")?.addEventListener("click", n.onPreferences), document.body.append(r), r;
}
function t() {
	typeof document > "u" || document.querySelector(".ck-banner")?.remove();
}
//#endregion
//#region src/consent/i18n.ts
var n = {
	en: {
		bannerTitle: "Cookie preferences",
		bannerDescription: "We use optional cookies for analytics, marketing and external media. Necessary cookies are always active.",
		acceptAll: "Accept all",
		reject: "Reject non-essential",
		preferences: "Preferences",
		modalTitle: "Privacy preferences",
		modalDescription: "Choose which optional services may run on this site.",
		save: "Save",
		rejectAll: "Reject all",
		close: "Close",
		cookieSettings: "Cookie settings",
		categories: {
			necessary: {
				title: "Necessary",
				description: "Required for security, forms and core site functionality. Always enabled."
			},
			analytics: {
				title: "Analytics",
				description: "Helps us understand visits and improve the website."
			},
			marketing: {
				title: "Marketing",
				description: "Allows advertising, remarketing and conversion measurement."
			},
			externalMedia: {
				title: "External media",
				description: "Loads YouTube, Vimeo, maps and similar embedded content."
			}
		},
		youtubeMessage: "This video is hosted by YouTube. To protect your privacy it is only loaded after you consent to external media.",
		allowOnce: "Allow once",
		alwaysAllow: "Always allow",
		openOnYouTube: "Open on YouTube"
	},
	de: {
		bannerTitle: "Cookie-Einstellungen",
		bannerDescription: "Wir verwenden optionale Cookies für Analyse, Marketing und externe Medien. Notwendige Cookies sind immer aktiv.",
		acceptAll: "Alle akzeptieren",
		reject: "Nicht notwendige ablehnen",
		preferences: "Einstellungen",
		modalTitle: "Datenschutz-Einstellungen",
		modalDescription: "Wählen Sie, welche optionalen Dienste auf dieser Website ausgeführt werden dürfen.",
		save: "Speichern",
		rejectAll: "Alle ablehnen",
		close: "Schließen",
		cookieSettings: "Cookie-Einstellungen",
		categories: {
			necessary: {
				title: "Notwendig",
				description: "Erforderlich für Sicherheit, Formulare und grundlegende Website-Funktionen. Immer aktiv."
			},
			analytics: {
				title: "Analyse",
				description: "Hilft uns, Besuche zu verstehen und die Website zu verbessern."
			},
			marketing: {
				title: "Marketing",
				description: "Erlaubt Werbung, Remarketing und Conversion-Messung."
			},
			externalMedia: {
				title: "Externe Medien",
				description: "Lädt YouTube, Vimeo, Karten und ähnliche eingebettete Inhalte."
			}
		},
		youtubeMessage: "Dieses Video wird von YouTube gehostet. Zum Schutz Ihrer Privatsphäre wird es erst nach Ihrer Zustimmung zu externen Medien geladen.",
		allowOnce: "Einmal erlauben",
		alwaysAllow: "Immer erlauben",
		openOnYouTube: "Auf YouTube öffnen"
	}
};
function r(e = "en", t) {
	let r = n[e] ?? n.en;
	return {
		...r,
		...t,
		categories: {
			...r.categories,
			...t?.categories
		}
	};
}
//#endregion
//#region src/consent/storage.ts
var i = "site-consent", a = 180, o = [
	"analytics",
	"marketing",
	"externalMedia"
], s = ["necessary", ...o], c = /* @__PURE__ */ new Map();
function l() {
	return typeof window < "u" && window.localStorage ? window.localStorage : {
		getItem: (e) => c.get(e) ?? null,
		setItem: (e, t) => {
			c.set(e, t);
		},
		removeItem: (e) => {
			c.delete(e);
		}
	};
}
function u(e, t = {}) {
	return {
		necessary: !0,
		analytics: t.analytics ?? !1,
		marketing: t.marketing ?? !1,
		externalMedia: t.externalMedia ?? !1,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		version: e.version
	};
}
function d(e, t) {
	if (!e || typeof e != "object") return null;
	let n = e;
	return n.version !== t || typeof n.timestamp != "string" ? null : {
		...u({ version: t }, {
			analytics: n.analytics === !0,
			marketing: n.marketing === !0,
			externalMedia: n.externalMedia === !0
		}),
		timestamp: n.timestamp
	};
}
function f(e) {
	let t = e.storageKey ?? "site-consent", n = l().getItem(t);
	if (!n) return null;
	try {
		let t = d(JSON.parse(n), e.version);
		return !t || h(t, e.expirationDays ?? 180) ? null : t;
	} catch {
		return null;
	}
}
function p(e, t) {
	l().setItem(e.storageKey ?? "site-consent", JSON.stringify(t));
}
function m(e) {
	l().removeItem(e.storageKey ?? "site-consent");
}
function h(e, t) {
	let n = Date.parse(e.timestamp);
	return Number.isNaN(n) ? !0 : Date.now() - n > t * 24 * 60 * 60 * 1e3;
}
//#endregion
//#region src/consent/modal.ts
var g = null;
function _(e, t, n, r = o) {
	if (typeof document > "u") return null;
	v(), g = document.activeElement;
	let i = document.createElement("div");
	return i.className = "ck-modal", i.setAttribute("role", "dialog"), i.setAttribute("aria-modal", "true"), i.setAttribute("aria-labelledby", "ck-modal-title"), i.innerHTML = `
    <div class="ck-modal__backdrop" data-ck-close></div>
    <form class="ck-modal__panel">
      <header class="ck-modal__header">
        <div>
          <h2 id="ck-modal-title">${e.modalTitle}</h2>
          <p>${e.modalDescription}</p>
        </div>
        <button class="ck-icon-button" type="button" aria-label="${e.close}" data-ck-close>×</button>
      </header>
      <div class="ck-modal__body">
        ${y("necessary", e, t.necessary, !0)}
        ${r.map((n) => y(n, e, t[n], !1)).join("")}
      </div>
      <footer class="ck-modal__footer">
        <button type="button" class="ck-button ck-button--secondary" data-ck-reject-all>${e.rejectAll}</button>
        <button type="button" class="ck-button ck-button--ghost" data-ck-accept-all>${e.acceptAll}</button>
        <button type="submit" class="ck-button ck-button--primary">${e.save}</button>
      </footer>
    </form>
  `, i.addEventListener("keydown", (e) => b(e, i)), i.querySelectorAll("[data-ck-close]").forEach((e) => e.addEventListener("click", v)), i.querySelector("[data-ck-accept-all]")?.addEventListener("click", n.onAcceptAll), i.querySelector("[data-ck-reject-all]")?.addEventListener("click", n.onRejectAll), i.querySelector("form")?.addEventListener("submit", (e) => {
		e.preventDefault();
		let t = Object.fromEntries(o.map((e) => [e, i.querySelector(`input[name="${e}"]`)?.checked === !0]));
		n.onSave(t);
	}), document.body.append(i), queueMicrotask(() => i.querySelector("button, input")?.focus()), i;
}
function v() {
	typeof document > "u" || (document.querySelector(".ck-modal")?.remove(), g instanceof HTMLElement && g.focus());
}
function y(e, t, n, r) {
	let i = t.categories[e];
	return `
    <label class="ck-category ${r ? "ck-category--locked" : ""}">
      <span>
        <strong>${i.title}</strong>
        <small>${i.description}</small>
      </span>
      <input type="checkbox" name="${e}" ${n ? "checked" : ""} ${r ? "checked disabled" : ""} />
    </label>
  `;
}
function b(e, t) {
	if (e.key === "Escape") {
		v();
		return;
	}
	if (e.key !== "Tab") return;
	let n = Array.from(t.querySelectorAll("button, input, [href], [tabindex]:not([tabindex=\"-1\"])")).filter((e) => !e.hasAttribute("disabled")), r = n[0], i = n[n.length - 1];
	!r || !i || (e.shiftKey && document.activeElement === r ? (e.preventDefault(), i.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), r.focus()));
}
//#endregion
//#region src/consent/script-loader.ts
function x(e, t = {}) {
	if (typeof document > "u") return Promise.reject(/* @__PURE__ */ Error("Cannot load scripts outside a browser document."));
	if (t.id) {
		let e = document.getElementById(t.id);
		if (e instanceof HTMLScriptElement) return Promise.resolve(e);
	}
	return new Promise((n, r) => {
		let i = document.createElement("script");
		i.src = e, i.async = t.async ?? !0, i.defer = t.defer ?? !1, t.id && (i.id = t.id), Object.entries(t.attributes ?? {}).forEach(([e, t]) => i.setAttribute(e, t)), i.addEventListener("load", () => n(i), { once: !0 }), i.addEventListener("error", () => r(/* @__PURE__ */ Error(`Failed to load ${e}`)), { once: !0 }), document.head.append(i);
	});
}
function S(e) {
	typeof document > "u" || document.querySelectorAll("script[type=\"text/plain\"][data-consent]").forEach((t) => {
		let n = t.dataset.consent;
		if (!n || !e(n) || t.dataset.consentActivated === "true") return;
		let r = document.createElement("script");
		for (let e of t.attributes) e.name === "type" || e.name === "data-consent" || r.setAttribute(e.name, e.value);
		t.dataset.src && (r.src = t.dataset.src), r.text = t.textContent ?? "", t.dataset.consentActivated = "true", t.after(r);
	});
}
//#endregion
//#region src/consent/google-consent-mode.ts
function C(e, t = "update") {
	typeof window > "u" || (window.dataLayer = window.dataLayer ?? [], window.gtag = window.gtag ?? function(...e) {
		window.dataLayer?.push(e);
	}, window.gtag("consent", t, {
		analytics_storage: e.analytics ? "granted" : "denied",
		ad_storage: e.marketing ? "granted" : "denied",
		ad_user_data: e.marketing ? "granted" : "denied",
		ad_personalization: e.marketing ? "granted" : "denied"
	}));
}
//#endregion
//#region src/consent/youtube.ts
function w(e) {
	typeof document > "u" || (T(), document.querySelectorAll(".ck-youtube").forEach((t) => {
		let n = k(t);
		if (n) {
			if (t.dataset.videoId = n, e.hasConsent()) {
				D(t);
				return;
			}
			if (t.querySelector("iframe")) {
				E(t, e);
				return;
			}
			t.dataset.enhanced !== "true" && E(t, e);
		}
	}));
}
function T() {
	typeof document > "u" || document.querySelectorAll("iframe[src*=\"youtube.com/embed/\"], iframe[src*=\"youtube-nocookie.com/embed/\"]").forEach((e) => {
		if (e.dataset.consentConverted === "true") return;
		let t = e.src.match(/embed\/([^?&]+)/)?.[1];
		if (!t) return;
		let n = document.createElement("div");
		n.className = "ck-youtube", n.dataset.videoId = t, n.dataset.title = e.title || "YouTube video", n.dataset.consentConverted = "true", e.replaceWith(n);
	});
}
function E(e, t) {
	if (e.dataset.enhanced = "true", t.hasConsent()) {
		D(e);
		return;
	}
	let n = e.dataset.title ?? "YouTube video", r = k(e);
	if (!r) return;
	e.dataset.videoId = r;
	let i = e.dataset.thumbnail, a = e.dataset.youtubeUrl ?? `https://www.youtube.com/watch?v=${r}`;
	e.innerHTML = `
    <div class="ck-youtube__thumb"${i ? ` style="background-image: url('${A(i)}')"` : ""}></div>
    <div class="ck-youtube__overlay">
      <button class="ck-youtube__play" type="button" data-ck-play aria-label="Load ${A(n)}">
        <span class="ck-youtube__play-icon" aria-hidden="true"></span>
      </button>
      <p>${t.dictionary.youtubeMessage}</p>
      <div class="ck-youtube__actions">
        <button class="ck-button ck-button--secondary" type="button" data-ck-allow-once>${t.dictionary.allowOnce}</button>
        <button class="ck-button ck-button--primary" type="button" data-ck-always-allow>${t.dictionary.alwaysAllow}</button>
        <a class="ck-button ck-button--ghost ck-youtube__link" href="${A(a)}" target="_blank" rel="noopener noreferrer">${t.dictionary.openOnYouTube}</a>
      </div>
    </div>
  `, e.querySelector("[data-ck-play]")?.addEventListener("click", () => D(e)), e.querySelector("[data-ck-allow-once]")?.addEventListener("click", () => D(e)), e.querySelector("[data-ck-always-allow]")?.addEventListener("click", () => {
		t.grantPersistentConsent(), D(e);
	});
}
function D(e) {
	if (e.querySelector("iframe")) return;
	let t = k(e);
	if (!t) return;
	e.dataset.videoId = t;
	let n = e.dataset.title ?? "YouTube video", r = document.createElement("iframe");
	r.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(t)}?autoplay=1&rel=0`, r.title = n, r.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", r.allowFullscreen = !0, r.loading = "lazy", r.referrerPolicy = "strict-origin-when-cross-origin", e.replaceChildren(r), e.classList.add("ck-youtube--loaded");
}
function O(e) {
	try {
		let t = new URL(e);
		if (t.hostname === "youtu.be") return t.pathname.split("/").filter(Boolean)[0] ?? null;
		if (t.hostname.endsWith("youtube.com") || t.hostname.endsWith("youtube-nocookie.com")) {
			if (t.searchParams.get("v")) return t.searchParams.get("v");
			let e = t.pathname.match(/\/embed\/([^/?]+)/);
			if (e?.[1]) return e[1];
			let n = t.pathname.match(/\/shorts\/([^/?]+)/);
			if (n?.[1]) return n[1];
		}
	} catch {
		return e.trim() || null;
	}
	return null;
}
function k(e) {
	return e.dataset.videoId ?? (e.dataset.youtubeUrl ? O(e.dataset.youtubeUrl) : null);
}
function A(e) {
	return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;");
}
//#endregion
//#region src/consent/consent.ts
var j = {
	analytics: !0,
	marketing: !0,
	externalMedia: !0
}, M = class {
	config;
	state;
	listeners = /* @__PURE__ */ new Set();
	waitingCallbacks = /* @__PURE__ */ new Map();
	initialized = !1;
	constructor(e) {
		this.config = this.normalizeConfig(e), this.state = f(this.config) ?? u(this.config);
	}
	init(e) {
		return e && (this.config = this.normalizeConfig(e), this.state = f(this.config) ?? u(this.config)), this.initialized || typeof document > "u" ? this : (this.initialized = !0, this.config.googleConsentMode && C(this.state, "default"), this.injectFooterLink(), this.runAllowedIntegrations(), !f(this.config) && this.config.autoShowBanner && this.showBanner(), this);
	}
	get() {
		return { ...this.state };
	}
	has(e) {
		return this.state[e] === !0;
	}
	acceptAll() {
		return this.save({
			analytics: this.isCategoryEnabled("analytics"),
			marketing: this.isCategoryEnabled("marketing"),
			externalMedia: this.isCategoryEnabled("externalMedia")
		});
	}
	rejectAll() {
		return this.save({
			analytics: !1,
			marketing: !1,
			externalMedia: !1
		});
	}
	setCategory(e, t) {
		return this.save({ [e]: t }, e);
	}
	save(e, n) {
		let r = u(this.config, {
			analytics: this.isCategoryEnabled("analytics") ? e.analytics ?? this.state.analytics : !1,
			marketing: this.isCategoryEnabled("marketing") ? e.marketing ?? this.state.marketing : !1,
			externalMedia: this.isCategoryEnabled("externalMedia") ? e.externalMedia ?? this.state.externalMedia : !1
		});
		return this.state = r, p(this.config, r), t(), v(), this.notify(n), this.runAllowedIntegrations(), this.get();
	}
	openPreferences() {
		_(r(this.config.locale, this.config.translations), this.state, {
			onSave: (e) => this.save(e),
			onAcceptAll: () => this.acceptAll(),
			onRejectAll: () => this.rejectAll()
		}, o.filter((e) => this.isCategoryEnabled(e)));
	}
	refresh() {
		this.runAllowedIntegrations();
	}
	reset() {
		m(this.config), this.state = u(this.config), v(), this.notify(), this.runAllowedIntegrations(), this.config.autoShowBanner && this.showBanner();
	}
	onChange(e) {
		return this.listeners.add(e), () => this.listeners.delete(e);
	}
	whenGranted(e, t) {
		if (this.has(e)) return t(), () => void 0;
		let n = this.waitingCallbacks.get(e) ?? /* @__PURE__ */ new Set();
		return n.add(t), this.waitingCallbacks.set(e, n), () => n.delete(t);
	}
	loadScriptIfConsent(e, t, n) {
		return this.has(e) ? x(t, n) : Promise.resolve(null);
	}
	showBanner() {
		e(r(this.config.locale, this.config.translations), {
			onAcceptAll: () => this.acceptAll(),
			onReject: () => this.rejectAll(),
			onPreferences: () => this.openPreferences()
		});
	}
	runAllowedIntegrations() {
		this.config.googleConsentMode && C(this.state), this.config.autoBlockScripts && S((e) => this.has(e)), this.flushCallbacks(), this.config.autoEnhanceYouTube && w({
			hasConsent: () => this.has("externalMedia"),
			grantPersistentConsent: () => this.setCategory("externalMedia", !0),
			dictionary: r(this.config.locale, this.config.translations)
		});
	}
	flushCallbacks() {
		this.waitingCallbacks.forEach((e, t) => {
			this.has(t) && (e.forEach((e) => e()), e.clear());
		});
	}
	notify(e) {
		let t = this.get();
		this.listeners.forEach((e) => e(t)), typeof window < "u" && window.dispatchEvent(new CustomEvent("consentChanged", { detail: {
			consent: t,
			changedCategory: e
		} }));
	}
	injectFooterLink() {
		if (typeof document > "u" || (document.querySelectorAll("[data-ck-footer-link], [data-ck-open-preferences]").forEach((e) => {
			e.dataset.ckBound !== "true" && (e.dataset.ckBound = "true", e.addEventListener("click", (e) => {
				e.preventDefault(), this.openPreferences();
			}));
		}), !this.config.autoInjectFooterLink || document.querySelector("[data-ck-footer-link]"))) return;
		let e = document.createElement("button");
		e.type = "button", e.className = "ck-footer-link", e.dataset.ckFooterLink = "true", e.textContent = r(this.config.locale, this.config.translations).cookieSettings, e.dataset.ckBound = "true", e.addEventListener("click", () => this.openPreferences()), document.body.append(e);
	}
	isCategoryEnabled(e) {
		return (this.config.categories ?? j)[e] !== !1;
	}
	normalizeConfig(e) {
		return {
			...e,
			version: e.version,
			locale: e.locale ?? "en",
			storageKey: e.storageKey ?? "site-consent",
			categories: {
				...j,
				...e.categories
			},
			autoShowBanner: e.autoShowBanner ?? !0,
			autoInjectFooterLink: e.autoInjectFooterLink ?? !0,
			autoBlockScripts: e.autoBlockScripts ?? !0,
			autoEnhanceYouTube: e.autoEnhanceYouTube ?? !0,
			googleConsentMode: e.googleConsentMode ?? !1
		};
	}
}, N = new M({ version: 1 });
function P(e) {
	return new M(e);
}
//#endregion
export { s as ALL_CATEGORIES, N as Consent, M as ConsentController, a as DEFAULT_EXPIRATION_DAYS, i as DEFAULT_STORAGE_KEY, o as OPTIONAL_CATEGORIES, S as activateDeclarativeScripts, m as clearStoredConsent, T as convertYouTubeIframes, P as createConsent, u as createConsentState, w as enhanceYouTubePlaceholders, O as extractYouTubeVideoId, h as isExpired, x as loadScript, D as mountIframe, d as normalizeConsentState, f as readStoredConsent, p as writeStoredConsent };
