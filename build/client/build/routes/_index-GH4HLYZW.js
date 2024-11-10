import {
  Anim,
  Button,
  motion
} from "/build/_shared/chunk-ZC7ZVJC7.js";
import "/build/_shared/chunk-Y6RJRNBS.js";
import {
  Link
} from "/build/_shared/chunk-KIFWDNN3.js";
import {
  createHotContext
} from "/build/_shared/chunk-2SFEX3OF.js";
import "/build/_shared/chunk-JR22VO6P.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-F4KNNEUR.js";
import "/build/_shared/chunk-PLT55Z5M.js";
import "/build/_shared/chunk-2Z2JGDFU.js";
import {
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// app/routes/_index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1731243647393.7087";
}
var parent = Anim.opacity(2).stagger(0.2).spring(50, 0, 10).delay_children(0.4).build();
var child = Anim.bounceY(32).spring_child(100, 20, 1).as();
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "font-sf w-screen flex flex-col items-center bg-no-repeat bg-contain", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { className: "w-screen h-screen flex flex-col gap-3 justify-center items-center bg-no-repeat bg-cover", variants: parent, initial: "inactive", animate: "active", style: {
    backgroundImage: "url('/images/PILLS.png')",
    backgroundPositionX: "50%"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { className: "tracking-tight text-center font-black text-[8.5rem]", style: {
      textShadow: "0 0 64px rgba(0, 128, 255, 0.8)"
    }, variants: child, children: "PillPal Pro" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 33,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { variants: child, className: "tracking-tight leading-[4rem] text-center text-[3rem]", children: [
      "the pill counter you didn't ask for",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 41,
        columnNumber: 17
      }, this),
      "(duh, it's for your grandparents)"
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 39,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { variants: child, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { asChild: true, variant: "ghost", className: "text-[3rem] p-[4rem] my-[2rem] underline font-medium", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/dashboard/PillBox1", children: "To Dashboard" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 47,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 46,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 29,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-GH4HLYZW.js.map
