// 滚动时导航栏变色，出现顶部按钮点击返回顶部
const header = document.querySelector(".header");
const scrollToTopBtn = document.querySelector("#scrollToTopBtn");
document.addEventListener("scroll", function () {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop > 0) {
    header.classList.add("header-active");
    scrollToTopBtn.style.display = "block";
    scrollToTopBtn.style.transition = "1s ease";
  } else {
    header.classList.remove("header-active");
    scrollToTopBtn.style.display = "none";
    scrollToTopBtn.style.transition = "1s ease";
  }
});
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
//鼠标移动后菜单文字变色
const menuAtag = document.querySelectorAll(".header-container .menu .item");
