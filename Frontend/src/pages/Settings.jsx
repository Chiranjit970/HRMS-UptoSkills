import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDarkMode } from "../contexts/DarkModeContext.jsx";

// Simple icon components using inline SVGs for zero extra deps
const Icon = {
  Bell: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M14 18.5a2 2 0 1 1-4 0" />
      <path strokeWidth="1.5" d="M6.5 9a5.5 5.5 0 1 1 11 0c0 3.733 1.25 5 1.25 5H5.25S6.5 12.733 6.5 9Z" />
    </svg>
  ),
  Moon: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  ),
  Star: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M12 .587l3.668 7.431 8.21 1.193-5.939 5.79 1.403 8.179L12 18.896l-7.342 3.84 1.403-8.179L.122 9.211l8.21-1.193z"/>
    </svg>
  ),
  Share: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M15 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path strokeWidth="1.5" d="M8.91 12.09 15 9m-6.09 5.91L15 15" />
    </svg>
  ),
  ChevronRight: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M9 6l6 6-6 6" />
    </svg>
  ),
  Shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M12 3l7 4v5c0 5-4 7-7 9-3-2-7-4-7-9V7l7-4z"/>
    </svg>
  ),
  Doc: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path strokeWidth="1.5" d="M14 2v6h6"/>
    </svg>
  ),
  Cookie: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M21 12a9 9 0 1 1-9-9 3 3 0 0 0 3 3 3 3 0 0 0 3 3 3 3 0 0 0 3 3Z"/>
      <circle cx="9" cy="10" r="1.2" />
      <circle cx="13" cy="14" r="1.2" />
      <circle cx="8" cy="15.5" r="1.2" />
    </svg>
  ),
  Message: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
    </svg>
  ),
  Mail: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M3 5h18v14H3z"/>
      <path strokeWidth="1.5" d="M3 7l9 6 9-6"/>
    </svg>
  ),
  Logout: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path strokeWidth="1.5" d="M10 17l-1.5 1.5A2 2 0 0 1 6 18V6a2 2 0 0 1 2.5-1.5L10 6"/>
      <path strokeWidth="1.5" d="M15 12H7m8 0l-3-3m3 3-3 3"/>
    </svg>
  ),
};

function ToggleSwitch({ enabled, onChange }) {
  const handleClick = () => {
    console.log('Toggle clicked, current state:', enabled);
    onChange(!enabled);
  };

  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={handleClick}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        enabled ? "bg-indigo-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Card({ title, children }) {
  const { darkMode } = useDarkMode();
  
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const cardBorder = darkMode ? "border-gray-700" : "border-gray-200";
  const titleColor = darkMode ? "text-white" : "text-gray-800";
  
  return (
    <div className={`rounded-xl border ${cardBorder} ${cardBg} p-4 shadow-sm sm:p-6`}>
      <h2 className={`mb-4 text-lg font-semibold ${titleColor} sm:text-xl`}>{title}</h2>
      <div className="space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
}

function RowButton({ icon, label, sublabel, onClick, rightIcon = true }) {
  const { darkMode } = useDarkMode();
  
  const buttonBg = darkMode ? "bg-gray-700/50 hover:bg-gray-700" : "bg-indigo-50/50 hover:bg-indigo-50";
  const labelColor = darkMode ? "text-white" : "text-gray-800";
  const sublabelColor = darkMode ? "text-gray-400" : "text-gray-500";
  const chevronColor = darkMode ? "text-gray-500" : "text-gray-400";
  
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl ${buttonBg} p-3 text-left transition sm:p-4`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className={`font-medium ${labelColor}`}>{label}</p>
          {sublabel && (
            <p className={`text-sm ${sublabelColor}`}>{sublabel}</p>
          )}
        </div>
      </div>
      {rightIcon && <Icon.ChevronRight className={`h-5 w-5 ${chevronColor}`} />}
    </button>
  );
}

function Modal({ open, title, children, onClose }) {
  const backdropRef = useRef(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  
  const modalBg = darkMode ? "bg-gray-800" : "bg-white";
  const titleColor = darkMode ? "text-gray-100" : "text-gray-800";
  const contentColor = darkMode ? "text-gray-300" : "text-gray-700";
  const closeButtonHover = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  
  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className={`max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl ${modalBg} p-5 shadow-xl sm:p-6`}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className={`text-xl font-semibold ${titleColor}`}>{title}</h3>
          <button onClick={onClose} className={`rounded-lg p-1.5 ${closeButtonHover}`}>
            <span className="sr-only">Close</span>✕
          </button>
        </div>
        <div className={`prose max-w-none prose-p:leading-relaxed ${contentColor}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [notifications, setNotifications] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [modal, setModal] = useState(null); // one of: 'privacy', 'terms', 'cookies', 'feedback', 'contact', 'rate', 'share', 'info'
  const close = () => setModal(null);

  // Debug state changes
  useEffect(() => {
    console.log('Notifications changed to:', notifications);
  }, [notifications]);

  useEffect(() => {
    console.log('Dark mode changed to:', darkMode);
  }, [darkMode]);

  const hrmsSite = useMemo(() => "https://example-hrms.company.com", []);

  async function handleShare() {
    const shareData = {
      title: "HRMS Settings",
      text: "Check out the HRMS Settings app",
      url: hrmsSite,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(hrmsSite);
        setModal("share");
      } else {
        setModal("share");
      }
    } catch (e) {
      setModal("share");
    }
  }

  const mainBg = darkMode ? "bg-[#0c0d10]" : "bg-gray-50";
  const headerColor = darkMode ? "text-white" : "text-gray-900";
  const subtextColor = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`min-h-screen ${mainBg} px-4 py-6 sm:px-6 sm:py-10`}>
      <header className="mx-auto mb-6 max-w-5xl text-center sm:mb-10">
        <h1 className={`text-2xl font-semibold ${headerColor} sm:text-3xl`}>Settings</h1>
        <p className={`mt-2 text-sm ${subtextColor}`}>
          Manage your preferences and account settings.
        </p>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        {/* Top grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Preferences">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon.Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">Notification</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable or disable app notifications.
                    </p>
                  </div>
                </div>
                <ToggleSwitch enabled={notifications} onChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon.Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">Dark Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Switch to a darker interface theme.
                    </p>
                  </div>
                </div>
                <ToggleSwitch enabled={darkMode} onChange={toggleDarkMode} />
              </div>
            </div>
          </Card>

          <Card title="About the App">
            <div className="space-y-3">
              <RowButton
                icon={<Icon.Star className="h-5 w-5 text-amber-500" />}
                label="Rate App"
                sublabel="Provide your rating on the app store."
                onClick={() => setModal("rate")}
              />
              <RowButton
                icon={<Icon.Share className="h-5 w-5 text-indigo-500" />}
                label="Share App"
                sublabel="Share a download link with colleagues."
                onClick={handleShare}
              />
            </div>
          </Card>
        </div>

        {/* Legal & Support */}
        <Card title="Legal & Support">
          <div className="grid gap-3 md:grid-cols-2">
            <RowButton
              icon={<Icon.Shield className="h-5 w-5 text-gray-500" />}
              label="Privacy Policy"
              onClick={() => setModal("privacy")}
            />
            <RowButton
              icon={<Icon.Doc className="h-5 w-5 text-gray-500" />}
              label="Terms and Conditions"
              onClick={() => setModal("terms")}
            />
            <RowButton
              icon={<Icon.Cookie className="h-5 w-5 text-gray-500" />}
              label="Cookies Policy"
              onClick={() => setModal("cookies")}
            />
            <RowButton
              icon={<Icon.Mail className="h-5 w-5 text-gray-500" />}
              label="Contact"
              onClick={() => setModal("contact")}
            />
            <RowButton
              icon={<Icon.Message className="h-5 w-5 text-gray-500" />}
              label="Feedback"
              onClick={() => setModal("feedback")}
            />
          </div>
        </Card>

        <div className="flex justify-center">
          <button
            onClick={() => setModal("info")}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            <Icon.Logout className="h-5 w-5" />
            Logout
          </button>
        </div>
      </main>

      {/* Modals */}
      <Modal open={modal === "privacy"} onClose={close} title="Privacy Policy">
        <p>
          We value your privacy. The HRMS Settings app collects only the minimum
          required information to provide services such as authentication,
          preferences storage, and usage analytics. Data is processed according
          to organizational policies and applicable data protection laws.
        </p>
        <p>
          Personal data is stored securely, retained only as long as necessary,
          and never sold. You may request access, correction, or deletion of your
          data through the Contact section.
        </p>
      </Modal>

      <Modal open={modal === "terms"} onClose={close} title="Terms and Conditions">
        <p>
          By using the HRMS Settings app, you agree to use it for legitimate HR
          operations. Do not attempt to bypass security controls or access data
          you are not authorized to view. All activity may be logged for
          compliance purposes.
        </p>
        <p>
          The app is provided as-is by the HR department. Features and access may
          change without notice.
        </p>
      </Modal>

      <Modal open={modal === "cookies"} onClose={close} title="Cookies Policy">
        <p>
          We use essential cookies for sign-in and session continuity, and
          analytics cookies to improve user experience. You can disable
          non-essential cookies in your browser or via organizational settings.
        </p>
      </Modal>

      <Modal open={modal === "contact"} onClose={close} title="Contact">
        <p>
          HRMS Support Desk<br/>
          Email: hrms-support@company.com<br/>
          Hours: Mon–Fri, 9:00–18:00 (local time)
        </p>
      </Modal>

      <Modal open={modal === "feedback"} onClose={close} title="Feedback">
        <FeedbackForm onSubmitted={close} />
      </Modal>

      <Modal open={modal === "rate"} onClose={close} title="Rate App">
        <RateApp onDone={close} />
      </Modal>

      <Modal open={modal === "share"} onClose={close} title="Share App">
        <p>
          Link copied to clipboard. Share this with your colleagues:
          <br />
          <a className="text-indigo-600 underline" href={hrmsSite} target="_blank" rel="noreferrer">
            {hrmsSite}
          </a>
        </p>
      </Modal>

      <Modal open={modal === "info"} onClose={close} title="Logout">
        <p>
          For security, ensure all work is saved before logging out. In a real
          app this would clear your session and redirect to the sign-in page.
        </p>
      </Modal>
    </div>
  );
}

function FeedbackForm({ onSubmitted }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { darkMode } = useDarkMode();

  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => onSubmitted?.(), 600);
  }

  if (submitted) {
    const submittedColor = darkMode ? "text-gray-300" : "text-gray-700";
    return <p className={submittedColor}>Thanks for your feedback! We appreciate you helping us improve.</p>;
  }

  const labelColor = darkMode ? "text-gray-300" : "text-gray-700";
  const inputBg = darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900";
  const inputPlaceholder = darkMode ? "placeholder-gray-400" : "placeholder-gray-500";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className={`mb-1 block text-sm font-medium ${labelColor}`}>Your email (optional)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500 ${inputBg} ${inputPlaceholder}`}
        />
      </div>
      <div>
        <label className={`mb-1 block text-sm font-medium ${labelColor}`}>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500 ${inputBg} ${inputPlaceholder}`}
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">Submit</button>
      </div>
    </form>
  );
}

function RateApp({ onDone }) {
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function submit() {
    setDone(true);
    setTimeout(() => onDone?.(), 700);
  }

  if (done) {
    return <p>Thanks for rating us {score}/5 ⭐</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setScore(n)}
            className={`p-1 ${n <= score ? "text-amber-500" : "text-gray-300"}`}
            aria-label={`${n} star`}
          >
            <Icon.Star className="h-7 w-7" />
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          disabled={!score}
          onClick={submit}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}