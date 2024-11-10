var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 66,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 116,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  app: () => app,
  db: () => db,
  default: () => App,
  links: () => links
});
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload
} from "@remix-run/react";

// app/tailwind.css?url
var tailwind_default = "/build/_assets/tailwind-W5OZGJJX.css?url";

// app/root.tsx
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var firebaseConfig = {
  apiKey: "AIzaSyBt9RaT4glOjaVYkSUfYKM3L5g_BxFMtOA",
  authDomain: "vitavault-ddba4.firebaseapp.com",
  databaseURL: "https://vitavault-ddba4-default-rtdb.firebaseio.com",
  projectId: "vitavault-ddba4",
  storageBucket: "vitavault-ddba4.firebasestorage.app",
  messagingSenderId: "251140544413",
  appId: "1:251140544413:web:9e68b0d1c882bacfd2c174",
  measurementId: "G-KXW9L7Z0XR"
}, app = initializeApp(firebaseConfig), db = getDatabase(app), links = () => [
  { rel: "stylesheet", href: tailwind_default }
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2(
        "link",
        {
          rel: "icon",
          href: "data:image/x-icon;base64,AA"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 36,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 34,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.$docId.tsx
var dashboard_docId_exports = {};
__export(dashboard_docId_exports, {
  default: () => Block
});
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoIosCheckmarkCircle, IoIosWarning } from "react-icons/io";
import { motion } from "framer-motion";

// app/core/animation.ts
var Anim = class {
  inactive;
  active;
  constructor(i = {}, a = {}) {
    this.inactive = i, this.active = a, this.active.transition = {};
  }
  spring(stiffness, delay = 0, damping = 10, mass = 1) {
    return this.active.transition.stiffness = stiffness, this.active.transition.type = "spring", this.active.transition.damping = damping, this.active.transition.mass = mass, this.active.transition.delay = delay, this;
  }
  spring_child(stiffness, damping = 10, mass = 1) {
    return this.active.transition.stiffness = stiffness, this.active.transition.type = "spring", this.active.transition.damping = damping, this.active.transition.mass = mass, this;
  }
  // delay children
  delay_children(dur = 0.5) {
    return this.active.transition.delayChildren = dur, this;
  }
  // stagger children
  stagger(amt = 0.05, reverse = !1) {
    return this.active.transition.staggerChildren = amt, this.active.transition.staggerDirection = reverse ? -1 : 1, this;
  }
  stagger_mirror(amt = 0.05, reverse = !1) {
    return this.active.transition.staggerChildren = amt, this.active.transition.staggerDirection = reverse ? -1 : 1, this.inactive.transition = {}, this.inactive.transition.staggerChildren = amt, this.inactive.transition.staggerDirection = reverse ? 1 : -1, this;
  }
  when(afterInstead = !1) {
    return afterInstead ? this.active.transition.when = "afterChildren" : this.active.transition.when = "beforeChildren", this;
  }
  loop(type = "mirror", times = "Infinity", delay = 0) {
    return this.active.transition.repeatType = type, this.active.transition.repeat = times, this.active.transition.repeatDelay = delay, this;
  }
  add(prop, inactive, active) {
    return this.inactive[prop] = inactive, this.active[prop] = active, this;
  }
  default() {
    return this.spring(100), this.delay_children(), this;
  }
  // clear transitions if child in staggered animation
  // transition inherited from parent
  build(transitions = !0) {
    return transitions ? this.inactive.transition = this.active.transition : (delete this.inactive.transition, delete this.active.transition), {
      inactive: this.inactive,
      active: this.active
    };
  }
  // gives the current thingy without anything too special
  as() {
    return {
      inactive: this.inactive,
      active: this.active
    };
  }
  static opacity(duration) {
    return new Anim(
      {
        opacity: 0
      },
      {
        opacity: 1
      }
    );
  }
  static point(coords) {
    return new Anim(
      {
        x: coords[0] + "px",
        y: coords[1] + "px",
        opacity: 0
      },
      {
        x: 0,
        y: 0,
        opacity: 1
      }
    );
  }
  static flipX() {
    return new Anim(
      {
        transform: "rotateX(180deg)"
      },
      {
        transform: "rotateX(0deg)"
      }
    );
  }
  static flipY() {
    return new Anim(
      {
        transform: "rotateY(180deg)"
      },
      {
        transform: "rotateY(0deg)"
      }
    );
  }
  static bounceY(y) {
    return new Anim(
      {
        y: y + "px",
        opacity: 0
      },
      {
        y: "0px",
        opacity: 1
      }
    );
  }
  static bounceX(x) {
    return new Anim(
      {
        x: x + "px",
        opacity: 0
      },
      {
        x: "0px",
        opacity: 1
      }
    );
  }
  static scale(x = [0, 1], y = [0, 1]) {
    return new Anim(
      {
        transform: `scale(${x[0]}, ${y[0]})`,
        opacity: 0
      },
      {
        transform: `scale(${x[1]}, ${y[1]})`,
        opacity: 1
      }
    );
  }
};

// app/routes/dashboard.$docId.tsx
import { useParams } from "@remix-run/react";

// app/core/useData.ts
import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
function useData(path) {
  let [data, setData] = useState();
  return useEffect(() => {
    let dataRef = ref(db, path);
    return onValue(dataRef, (snap) => {
      setData(snap.val());
    });
  }, [path]), data;
}
function updateData(path, updates) {
  update(ref(db, path), updates).then((v) => {
    console.log("updated");
  });
}

// app/routes/dashboard.$docId.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";

// app/core/gpt.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: !0
});
async function response(message) {
  return (await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a pharmacist who gives short but concise explanations about a drug's effects, how to take the drug, and any warnings about the drug's side effects. You will respond in one to two sentences."
      },
      {
        role: "user",
        content: message
      }
    ]
  })).choices[0];
}

// app/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// app/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// app/components/ui/button.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive: "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline: "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary: "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref2) => /* @__PURE__ */ jsxDEV3(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref: ref2,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/button.tsx",
      lineNumber: 47,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/routes/dashboard.$docId.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var child = Anim.bounceY(32).spring_child(100, 10).as();
function Block() {
  let { docId } = useParams(), data = useData(`/PillBoxes/${docId}`), [eff, setEff] = useState2(), [dir, setDir] = useState2(), [war, setWar] = useState2();
  return useEffect2(() => {
    data && (eff || response(`tell me about strictly the positive effects of ${data?.name}`).then((v) => {
      setEff(v.message.content ?? "");
    }), dir || response(`tell me strictly about the drug use directions of ${data?.name}`).then((v) => {
      setDir(v.message.content ?? "");
    }), war || response(`tell me strictly the warnings and side effects of ${data?.name}`).then((v) => {
      setWar(v.message.content ?? "");
    }));
  }, [data]), /* @__PURE__ */ jsxDEV4("div", { className: "w-11/12 flex-1 p-[2vw] flex flex-col items-center", children: [
    /* @__PURE__ */ jsxDEV4("div", { className: "flex flex-row items-center relative w-fit text-[6rem] font-black", children: [
      data?.name,
      /* @__PURE__ */ jsxDEV4("div", { className: "absolute right-0 m-auto w-[calc(100%+48px)]", onClick: () => {
        let newName = prompt("Enter a new pill name");
        updateData(`/PillBoxes/${docId}`, {
          name: newName
        }), setEff(""), setDir(""), setWar("");
      }, children: /* @__PURE__ */ jsxDEV4(FaEdit, { size: 32 }, void 0, !1, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 61,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 51,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.$docId.tsx",
      lineNumber: 49,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { className: "flex flex-row relative w-fit text-[1.5rem] font-light", onClick: () => {
      let newInterval = prompt("Enter new interval");
      updateData(`/PillBoxes/${docId}`, {
        takeTimeInterval: Number.parseInt(newInterval ?? "10")
      });
    }, children: [
      /* @__PURE__ */ jsxDEV4("span", { className: "font-medium", children: "Interval" }, void 0, !1, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 71,
        columnNumber: 13
      }, this),
      ": ",
      data?.takeTimeInterval,
      " seconds"
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.$docId.tsx",
      lineNumber: 64,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(motion.div, { variants: child, className: "w-full flex flex-col p-[2.5vw] mt-[2rem] gap-[1rem] rounded-2xl border-gray-200 border-2 shadow-xl", children: [
      /* @__PURE__ */ jsxDEV4("div", { className: "flex flex-row items-center gap-[0.5rem]", children: [
        /* @__PURE__ */ jsxDEV4(BsFillQuestionCircleFill, { size: 40 }, void 0, !1, {
          fileName: "app/routes/dashboard.$docId.tsx",
          lineNumber: 75,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { className: "text-[2rem] font-medium", children: "Effects" }, void 0, !1, {
          fileName: "app/routes/dashboard.$docId.tsx",
          lineNumber: 76,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 74,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { className: "text-[1.5rem]", children: eff }, void 0, !1, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 80,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.$docId.tsx",
      lineNumber: 73,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(motion.div, { variants: child, className: "w-full flex flex-col p-[2.5vw] mt-[2rem] gap-[1rem] rounded-2xl border-gray-200 border-2 shadow-xl", children: [
      /* @__PURE__ */ jsxDEV4("div", { className: "flex flex-row items-center gap-[0.5rem]", children: [
        /* @__PURE__ */ jsxDEV4(IoIosCheckmarkCircle, { size: 40 }, void 0, !1, {
          fileName: "app/routes/dashboard.$docId.tsx",
          lineNumber: 86,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { className: "text-[2rem] font-medium", children: "Directions" }, void 0, !1, {
          fileName: "app/routes/dashboard.$docId.tsx",
          lineNumber: 87,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 85,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { className: "text-[1.5rem]", children: dir }, void 0, !1, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 91,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.$docId.tsx",
      lineNumber: 84,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(motion.div, { variants: child, className: "w-full flex flex-col p-[2.5vw] mt-[2rem] gap-[1rem] rounded-2xl border-gray-200 border-2 shadow-xl", children: [
      /* @__PURE__ */ jsxDEV4("div", { className: "flex flex-row items-center gap-[0.5rem]", children: [
        /* @__PURE__ */ jsxDEV4(IoIosWarning, { size: 40 }, void 0, !1, {
          fileName: "app/routes/dashboard.$docId.tsx",
          lineNumber: 97,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { className: "text-[2rem] font-medium", children: "Warning" }, void 0, !1, {
          fileName: "app/routes/dashboard.$docId.tsx",
          lineNumber: 98,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 96,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { className: "text-[1.5rem] leading-[2.25rem]", children: war }, void 0, !1, {
        fileName: "app/routes/dashboard.$docId.tsx",
        lineNumber: 102,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.$docId.tsx",
      lineNumber: 95,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(Button, { className: "mt-[2rem] self-start text-[1.5rem] p-[2rem]", variant: "outline", onClick: () => {
      console.log("clonk"), updateData(`/PillBoxes/${docId}`, {
        takeTime: Math.floor(Date.now() / 1e3 + (data?.takeTimeInterval ?? 0))
      });
    }, children: [
      "(test) add ",
      data?.takeTimeInterval,
      " seconds"
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.$docId.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.$docId.tsx",
    lineNumber: 48,
    columnNumber: 12
  }, this);
}

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => Dashboard
});
import { Link as Link2, Outlet as Outlet2, useLocation, useNavigate } from "@remix-run/react";
import { motion as motion2 } from "framer-motion";
import { FaClock } from "react-icons/fa";
import { useEffect as useEffect3, useState as useState3 } from "react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var boxes = [
  "PillBox1",
  "PillBox2",
  "PillBox3",
  "PillBox4"
], parent = Anim.bounceY(32).spring(100, 0, 10).stagger(0.2).build();
function Dashboard() {
  let location = useLocation(), navigate = useNavigate(), [auth, setAuth] = useState3(!1);
  return useEffect3(() => {
    if (auth)
      return;
    let pass = prompt("Password pwease");
    !auth && pass !== "andyiscool" && navigate("/"), setAuth(!0);
  }, []), /* @__PURE__ */ jsxDEV5("div", { className: "relative font-sf h-screen bg-no-repeat bg-cover", style: {
    backgroundImage: "url('/images/PILLS.png')",
    backgroundPositionX: "50%"
  }, children: /* @__PURE__ */ jsxDEV5("div", { className: "absolute inset-0 backdrop-blur-lg bg-black/30 flex flex-col justify-center items-center", children: /* @__PURE__ */ jsxDEV5(motion2.div, { variants: parent, initial: "inactive", animate: "active", className: "bg-white w-11/12 h-5/6 rounded-[2rem] relative flex flex-col py-[5vw] items-center shadow-2xl", children: [
    /* @__PURE__ */ jsxDEV5(Outlet2, {}, location.pathname, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 42,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { id: "row-of-things", className: "absolute bottom-[2vw] w-fit grid grid-cols-4 gap-[1rem]", children: boxes.map((v, i) => /* @__PURE__ */ jsxDEV5(Panel, { number: i + 1, docId: v }, "pillbox" + i, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 44,
      columnNumber: 43
    }, this)) }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 43,
      columnNumber: 17
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 41,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 40,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 36,
    columnNumber: 12
  }, this);
}
function timeUntil(secondsUtc) {
  let nowUtc = Math.floor(Date.now() / 1e3), remainingSeconds = secondsUtc - nowUtc;
  if (remainingSeconds < 0)
    return "00:00:00";
  let hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  let minutes = Math.floor(remainingSeconds / 60), seconds = remainingSeconds % 60;
  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0")
  ].join(":");
}
function RealtimeClock(props) {
  let [counter, setCounter] = useState3(0);
  return useEffect3(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1e3);
  }, [counter]), /* @__PURE__ */ jsxDEV5("div", { children: timeUntil(props.time) }, void 0, !1, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 85,
    columnNumber: 12
  }, this);
}
function Panel(props) {
  let data = useData(`/PillBoxes/${props.docId}`);
  return /* @__PURE__ */ jsxDEV5("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxDEV5(Button, { asChild: !0, children: /* @__PURE__ */ jsxDEV5(Link2, { to: `/dashboard/${props.docId}`, className: "h-[12rem] aspect-[1/1] rounded-[26px]", children: /* @__PURE__ */ jsxDEV5("div", { className: "relative h-full flex flex-col justify-center items-center gap-[2rem]", children: [
      /* @__PURE__ */ jsxDEV5("div", { className: "h-fit text-[4rem] font-bold", children: props.number }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 101,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { className: "absolute bottom-[1rem] text-[1.25rem] font-regular", children: data?.name }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 104,
        columnNumber: 21
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 100,
      columnNumber: 17
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 99,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 98,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { className: "relative w-fit flex flex-row justify-center items-center gap-[0.5rem] p-[0.5rem] text-[1rem] font-bold", children: [
      /* @__PURE__ */ jsxDEV5(RealtimeClock, { time: data?.takeTime ?? 0 }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 111,
        columnNumber: 14
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { className: "absolute left-0 transform -translate-x-full", children: /* @__PURE__ */ jsxDEV5(FaClock, { size: 24 }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 113,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 112,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 110,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 97,
    columnNumber: 12
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
import { motion as motion3 } from "framer-motion";
import { Link as Link3 } from "@remix-run/react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var parent2 = Anim.opacity(2).stagger(0.2).spring(50, 0, 10).delay_children(0.4).build(), child2 = Anim.bounceY(32).spring_child(100, 20, 1).as();
function Index() {
  return /* @__PURE__ */ jsxDEV6("div", { className: "font-sf w-screen flex flex-col items-center bg-no-repeat bg-contain", children: /* @__PURE__ */ jsxDEV6(motion3.div, { className: "w-screen h-screen flex flex-col gap-3 justify-center items-center bg-no-repeat bg-cover", variants: parent2, initial: "inactive", animate: "active", style: {
    backgroundImage: "url('/images/PILLS.png')",
    backgroundPositionX: "50%"
  }, children: [
    /* @__PURE__ */ jsxDEV6(motion3.div, { className: "tracking-tight text-center font-black text-[8.5rem]", style: {
      textShadow: "0 0 64px rgba(0, 128, 255, 0.8)"
    }, variants: child2, children: "PillPal Pro" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 16,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV6(motion3.div, { variants: child2, className: "tracking-tight leading-[4rem] text-center text-[3rem]", children: [
      "the pill counter you didn't ask for",
      /* @__PURE__ */ jsxDEV6("br", {}, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 24,
        columnNumber: 17
      }, this),
      "(duh, it's for your grandparents)"
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 22,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV6(motion3.div, { variants: child2, children: /* @__PURE__ */ jsxDEV6(Button, { asChild: !0, variant: "ghost", className: "text-[3rem] p-[4rem] my-[2rem] underline font-medium", children: /* @__PURE__ */ jsxDEV6(Link3, { to: "/dashboard/PillBox1", children: "To Dashboard" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 30,
      columnNumber: 21
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 29,
      columnNumber: 17
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 28,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 11,
    columnNumber: 12
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-IVNPMON3.js", imports: ["/build/_shared/chunk-X3PXDGUE.js", "/build/_shared/chunk-KIFWDNN3.js", "/build/_shared/chunk-2SFEX3OF.js", "/build/_shared/chunk-JR22VO6P.js", "/build/_shared/chunk-F4KNNEUR.js", "/build/_shared/chunk-PLT55Z5M.js", "/build/_shared/chunk-2Z2JGDFU.js", "/build/_shared/chunk-PZDJHGND.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-U4MIVZ25.js", imports: ["/build/_shared/chunk-ETBHUXIR.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-GH4HLYZW.js", imports: ["/build/_shared/chunk-ZC7ZVJC7.js", "/build/_shared/chunk-Y6RJRNBS.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-RHBMPOBW.js", imports: ["/build/_shared/chunk-KUZABN7B.js", "/build/_shared/chunk-ZC7ZVJC7.js", "/build/_shared/chunk-Y6RJRNBS.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard.$docId": { id: "routes/dashboard.$docId", parentId: "routes/dashboard", path: ":docId", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard.$docId-VYUCDEJE.js", imports: ["/build/_shared/chunk-ETBHUXIR.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "cdb7cb2f", hmr: { runtime: "/build/_shared/chunk-2SFEX3OF.js", timestamp: 1731244222782 }, url: "/build/manifest-CDB7CB2F.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1, unstable_routeConfig: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/dashboard.$docId": {
    id: "routes/dashboard.$docId",
    parentId: "routes/dashboard",
    path: ":docId",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_docId_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
