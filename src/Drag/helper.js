export default function deBounce(fn, time = 200) {
    let timer;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(null, arguments);
      }, time);
    };
  }