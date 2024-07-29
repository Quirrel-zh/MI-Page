//鼠标经过按钮时箭头变色

const btnFirSliderLeft = document.querySelector(".slider-fir-btn-left");
const btnFirSliderRight = document.querySelector(".slider-fir-btn-right");
const arrowFirSliderLeft = document.querySelector("#slider-fir-prev-hover");
const arrowFirSliderRight = document.querySelector("#slider-fir-next-hover");
btnFirSliderLeft.addEventListener("mouseenter", function () {
  arrowFirSliderLeft.style.display = "block";
});
btnFirSliderLeft.addEventListener("mouseleave", function () {
  arrowFirSliderLeft.style.display = "none";
});
btnFirSliderRight.addEventListener("mouseenter", function () {
  arrowFirSliderRight.style.display = "block";
});
btnFirSliderRight.addEventListener("mouseleave", function () {
  arrowFirSliderRight.style.display = "none";
});

//右按钮点击切换
const firSliderlist = document.querySelector(".slider-fir .slider-wrapper");

//克隆第一张图片
const firsliderClone = firSliderlist.firstElementChild.cloneNode();
// const firsliderlastClone = firSliderlist.lastElementChild.cloneNode();
// 将克隆的图片放到轮播图末尾
firSliderlist.appendChild(firsliderClone);
// firSliderlist.prepend(firsliderlastClone);
// console.log(firSliderlist);
let index = 0;
//设置节流锁
let lock = true;
function handleRightBtn() {
  if (!lock) return;
  index++;
  firSliderlist.style.left = index * -100 + "%";
  firSliderlist.style.transition = "0.5s ease";

  if (index === 2) {
    index = 0;
    setTimeout(() => {
      firSliderlist.style.left = 0;
      firSliderlist.style.transition = "none";
    }, 500);
  }
  setSpan();
  lock = false;
  setTimeout(function () {
    lock = true;
  }, 500);
}
btnFirSliderRight.addEventListener("click", handleRightBtn);

//左按钮点击切换
btnFirSliderLeft.addEventListener("click", function () {
  if (!lock) return;
  index--;
  if (index === -1) {
    //index等于-1的时候瞬间切换到最后一张假图片
    firSliderlist.style.transition = "none";
    firSliderlist.style.left = 2 * -100 + "%";

    index = 1;
    setTimeout(() => {
      //再加上过渡切换到真正的最后一张图片

      firSliderlist.style.left = index * -100 + "%";
      firSliderlist.style.transition = "0.5s ease";
    });
  } else {
    firSliderlist.style.left = index * -100 + "%";
  }
  setSpan();
  lock = false;
  setTimeout(function () {
    lock = true;
  }, 500);
});

//下方按钮实现
const firbottom = document.querySelectorAll(".sliderFir-span span");
function setSpan() {
  for (let i = 0; i < firbottom.length; i++) {
    //
    // console.log(i);
    if (i === index) {
      firbottom[i].classList.add("leftactive");
    } else {
      firbottom[i].classList.remove("leftactive");
      // firSliderlist.style.transition = "0.5s ease";
    }
  }
}

const firbottomdiv = document.querySelector(".sliderFir-span");
firbottomdiv.addEventListener("click", (e) => {
  if (e.target.nodeName.toLowerCase() === "span") {
    const n = Number(e.target.getAttribute("data-n"));
    index = n;
    setSpan();
    firSliderlist.style.left = index * -100 + "%";
  }
});
// 自动轮播
let timerId = setInterval(handleRightBtn, 2500);

//移入鼠标暂停
const firstSlider = document.querySelector(".slider-fir");
firstSlider.addEventListener("mouseenter", function () {
  clearInterval(timerId);
});
// 移出鼠标继续
firstSlider.addEventListener("mouseleave", function () {
  clearInterval(timerId);
  timerId = setInterval(handleRightBtn, 2500);
});
