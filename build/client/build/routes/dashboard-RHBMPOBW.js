import {
  FaClock,
  useData
} from "/build/_shared/chunk-KUZABN7B.js";
import "/build/_shared/chunk-ETBHUXIR.js";
import {
  Anim,
  Button,
  motion
} from "/build/_shared/chunk-ZC7ZVJC7.js";
import "/build/_shared/chunk-Y6RJRNBS.js";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate
} from "/build/_shared/chunk-KIFWDNN3.js";
import {
  createHotContext
} from "/build/_shared/chunk-2SFEX3OF.js";
import "/build/_shared/chunk-JR22VO6P.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-F4KNNEUR.js";
import "/build/_shared/chunk-PLT55Z5M.js";
import {
  require_react
} from "/build/_shared/chunk-2Z2JGDFU.js";
import {
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// app/routes/dashboard.tsx
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/dashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/dashboard.tsx"
  );
  import.meta.hot.lastModified = "1731243775984.249";
}
var boxes = ["PillBox1", "PillBox2", "PillBox3", "PillBox4"];
var parent = Anim.bounceY(32).spring(100, 0, 10).stagger(0.2).build();
function Dashboard() {
  _s();
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    if (auth)
      return;
    const pass = prompt("Password pwease");
    if (!auth && pass !== "andyiscool") {
      navigate("/");
    }
    setAuth(true);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative font-sf h-screen bg-no-repeat bg-cover", style: {
    backgroundImage: "url('/images/PILLS.png')",
    backgroundPositionX: "50%"
  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 backdrop-blur-lg bg-black/30 flex flex-col justify-center items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { variants: parent, initial: "inactive", animate: "active", className: "bg-white w-11/12 h-5/6 rounded-[2rem] relative flex flex-col py-[5vw] items-center shadow-2xl", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, location.pathname, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 52,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "row-of-things", className: "absolute bottom-[2vw] w-fit grid grid-cols-4 gap-[1rem]", children: boxes.map((v, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Panel, { number: i + 1, docId: v }, "pillbox" + i, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 54,
      columnNumber: 42
    }, this)) }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 53,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 51,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 50,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 46,
    columnNumber: 10
  }, this);
}
_s(Dashboard, "PhwSqkiLarWsLgT2KfA3C1K7U4Q=", false, function() {
  return [useLocation, useNavigate];
});
_c = Dashboard;
function timeUntil(secondsUtc) {
  const nowUtc = Math.floor(Date.now() / 1e3);
  let remainingSeconds = secondsUtc - nowUtc;
  if (remainingSeconds < 0)
    return "00:00:00";
  const hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = [String(hours).padStart(2, "0"), String(minutes).padStart(2, "0"), String(seconds).padStart(2, "0")].join(":");
  return formattedTime;
}
function RealtimeClock(props) {
  _s2();
  const [counter, setCounter] = (0, import_react2.useState)(0);
  (0, import_react2.useEffect)(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1e3);
  }, [counter]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: timeUntil(props.time) }, void 0, false, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 85,
    columnNumber: 10
  }, this);
}
_s2(RealtimeClock, "uPkTgB8PBsujXy6a5mXWSxFNaD8=");
_c2 = RealtimeClock;
function Panel(props) {
  _s3();
  const data = useData(`/PillBoxes/${props.docId}`);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/dashboard/${props.docId}`, className: "h-[12rem] aspect-[1/1] rounded-[26px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative h-full flex flex-col justify-center items-center gap-[2rem]", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-fit text-[4rem] font-bold", children: props.number }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 98,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-[1rem] text-[1.25rem] font-regular", children: data?.name }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 101,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 97,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 96,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 95,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-fit flex flex-row justify-center items-center gap-[0.5rem] p-[0.5rem] text-[1rem] font-bold", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RealtimeClock, { time: data?.takeTime ?? 0 }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 108,
        columnNumber: 14
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute left-0 transform -translate-x-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaClock, { size: 24 }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 110,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 109,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 107,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 94,
    columnNumber: 10
  }, this);
}
_s3(Panel, "YnzXR8fPhsYQOtPUC4zYRXREqzc=", false, function() {
  return [useData];
});
_c3 = Panel;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "Dashboard");
$RefreshReg$(_c2, "RealtimeClock");
$RefreshReg$(_c3, "Panel");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Dashboard as default
};
//# sourceMappingURL=/build/routes/dashboard-RHBMPOBW.js.map
