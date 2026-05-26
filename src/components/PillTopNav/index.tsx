import "./pill-top-nav.scss";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import i18n from "@/i18n";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TextButton from "../TextButton";
import { NAV_ITEMS } from "./constants";

const setCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`;
};

export default function PillTopNav({
  initialTheme = "light",
}: {
  initialTheme?: string;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [lang, setLang] = useState(i18n.language || "en");
  const [theme, setTheme] = useState(initialTheme);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleMouseEnter = useCallback((key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const toggleLanguage = () => {
    const next = lang === "en" ? "vi" : "en";
    i18n.changeLanguage(next);
    setLang(next);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    setCookie("app-theme", next);
    setTheme(next);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="pill-top-nav" onMouseLeave={handleMouseLeave}>
      <div className="pill-top-nav__inner">
        <Logo size="small" className="pill-top-nav__brand" />

        <ul className="pill-top-nav__menu">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.key}
              className="pill-top-nav__item"
              onMouseEnter={() =>
                item.children?.length && handleMouseEnter(item.key)
              }
            >
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="pill-top-nav__trigger"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.key ? null : item.key
                      )
                    }
                    aria-expanded={openDropdown === item.key}
                  >
                    <span>{t(`pill_top_nav.${item.key}`)}</span>
                    <Icon
                      name="expand_more"
                      size="1.2em"
                      className={`pill-top-nav__arrow ${openDropdown === item.key ? "is-open" : ""}`}
                    />
                  </button>
                  {openDropdown === item.key && (
                    <div className="pill-top-nav__dropdown">
                      <ul className="pill-top-nav__dropdown-list">
                        {item.children.map((child) => (
                          <li key={child.key}>
                            <Link
                              to={child.href}
                              className="pill-top-nav__dropdown-link"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span className="pill-top-nav__dropdown-title">
                                {t(`pill_top_nav.${child.key}.title`)}
                              </span>
                              <span className="pill-top-nav__dropdown-desc">
                                {t(`pill_top_nav.${child.key}.desc`)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  className="pill-top-nav__link"
                  activeProps={{ className: "is-active" }}
                >
                  {t(`pill_top_nav.${item.key}`)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="pill-top-nav__actions">
          <button
            type="button"
            className="pill-top-nav__toggle pill-top-nav__toggle--lang"
            onClick={toggleLanguage}
            title={t("common.change_language")}
          >
            <Icon name="globe_asia" size="1.2em" />
          </button>

          <button
            type="button"
            className="pill-top-nav__toggle pill-top-nav__toggle--theme"
            onClick={toggleTheme}
            title={t("common.toggle_dark_mode")}
          >
            <Icon
              name={theme === "light" ? "dark_mode" : "light_mode"}
              size="1.2em"
            />
          </button>

          <TextButton
            className="pill-top-nav__action-link"
            onClick={() => {
              navigate({ to: "/auth/log-in" });
            }}
            text={t("pill_top_nav.log_in")}
            size="small"
            leftIcon={false}
            type="secondary"
            roundedCorner="roundedSquare"
          />
          <TextButton
            className="pill-top-nav__action-btn"
            onClick={() => {
              navigate({ to: "/auth/sign-up" });
            }}
            text={t("pill_top_nav.sign_up")}
            size="small"
            leftIcon={false}
            type="primary"
            roundedCorner="roundedSquare"
          />
        </div>
      </div>
    </nav>
  );
}
