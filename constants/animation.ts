export const fadeInOption = {
  rootMargin: '-100px',
  triggerOnce: true,
}

export const fadeInClassName = (inView: boolean) => ({
  'animate-slideIn': inView,
  invisible: !inView,
})
