//鼠标经过按钮时箭头变色

const btnSecSliderLeft = document.querySelector(".slider-sec-btn-left");
const btnSecSliderRight = document.querySelector(".slider-sec-btn-right");
const arrowSecSliderLeft = document.querySelector("#slider-sec-prev-hover");
const arrowSecSliderRight = document.querySelector("#slider-sec-next-hover");
btnSecSliderLeft.addEventListener("mouseenter", function () {
  arrowSecSliderLeft.style.display = "block";
});
btnSecSliderLeft.addEventListener("mouseleave", function () {
  arrowSecSliderLeft.style.display = "none";
});
btnSecSliderRight.addEventListener("mouseenter", function () {
  arrowSecSliderRight.style.display = "block";
});
btnSecSliderRight.addEventListener("mouseleave", function () {
  arrowSecSliderRight.style.display = "none";
});

const secSliderlist = document.querySelector(".slider-sec .slider-wrapper");

//克隆第一张图片
const secsliderClone = secSliderlist.firstElementChild.cloneNode();
// const firsliderlastClone = firSliderlist.lastElementChild.cloneNode();
// 将克隆的图片放到轮播图末尾
secSliderlist.appendChild(secsliderClone);
// firSliderlist.prepend(firsliderlastClone);
// console.log(firSliderlist);
let indexSec = 0;
//设置节流锁
let lockSec = true;
function handleRightBtnSec() {
  if (!lockSec) return;
  indexSec++;
  secSliderlist.style.left = indexSec * -100 + "%";
  secSliderlist.style.transition = "0.5s ease";

  if (indexSec === 2) {
    indexSec = 0;
    setTimeout(() => {
      secSliderlist.style.left = 0;
      secSliderlist.style.transition = "none";
    }, 500);
  }
  setSpanSec();
  lockSec = false;
  setTimeout(function () {
    lockSec = true;
  }, 500);
}
btnSecSliderRight.addEventListener("click", handleRightBtnSec);
//左按钮点击切换
btnSecSliderLeft.addEventListener("click", function () {
  if (!lockSec) return;
  indexSec--;
  if (indexSec === -1) {
    //index等于-1的时候瞬间切换到最后一张假图片
    secSliderlist.style.transition = "none";
    secSliderlist.style.left = 2 * -100 + "%";

    indexSec = 1;
    setTimeout(() => {
      //再加上过渡切换到真正的最后一张图片

      secSliderlist.style.left = indexSec * -100 + "%";
      secSliderlist.style.transition = "0.5s ease";
    });
  } else {
    secSliderlist.style.left = indexSec * -100 + "%";
  }
  setSpanSec();
  lockSec = false;
  setTimeout(function () {
    lockSec = true;
  }, 500);
});
//下方按钮实现
const secbottom = document.querySelectorAll(".sliderSec-span span");
function setSpanSec() {
  for (let i = 0; i < secbottom.length; i++) {
    //
    // console.log(i);
    if (i === indexSec) {
      secbottom[i].classList.add("leftactive");
    } else {
      secbottom[i].classList.remove("leftactive");
      // firSliderlist.style.transition = "0.5s ease";
    }
  }
}

const secbottomdiv = document.querySelector(".sliderSec-span");
secbottomdiv.addEventListener("click", (eSec) => {
  if (eSec.target.nodeName.toLowerCase() === "span") {
    const nSec = Number(eSec.target.getAttribute("data-n"));
    indexSec = nSec;
    setSpanSec();
    secSliderlist.style.left = indexSec * -100 + "%";
  }
});
// 自动轮播
let timerIdSec = setInterval(handleRightBtnSec, 2500);

//移入鼠标暂停
const secondSlider = document.querySelector(".slider-sec");
secondSlider.addEventListener("mouseenter", function () {
  clearInterval(timerIdSec);
});
// 移出鼠标继续
secondSlider.addEventListener("mouseleave", function () {
  clearInterval(timerIdSec);
  timerIdSec = setInterval(handleRightBtnSec, 2500);
});
