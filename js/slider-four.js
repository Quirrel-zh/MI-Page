//鼠标经过按钮时箭头变色

const btnFourSliderLeft = document.querySelector(".slider-four-btn-left");
const btnFourSliderRight = document.querySelector(".slider-four-btn-right");
const arrowFourSliderLeft = document.querySelector("#slider-four-prev-hover");
const arrowFourSliderRight = document.querySelector("#slider-four-next-hover");
btnFourSliderLeft.addEventListener("mouseenter", function () {
  arrowFourSliderLeft.style.display = "block";
});
btnFourSliderLeft.addEventListener("mouseleave", function () {
  arrowFourSliderLeft.style.display = "none";
});
btnFourSliderRight.addEventListener("mouseenter", function () {
  arrowFourSliderRight.style.display = "block";
});
btnFourSliderRight.addEventListener("mouseleave", function () {
  arrowFourSliderRight.style.display = "none";
});
const fourSliderlist = document.querySelector(".slider-four .slider-wrapper");

//克隆第一张图片
const foursliderClone = fourSliderlist.firstElementChild.cloneNode();
// const firsliderlastClone = firSliderlist.lastElementChild.cloneNode();
// 将克隆的图片放到轮播图末尾
fourSliderlist.appendChild(foursliderClone);
// firSliderlist.prepend(firsliderlastClone);
// console.log(firSliderlist);
let indexFour = 0;
//设置节流锁
let lockFour = true;
function handleRightBtnFour() {
  if (!lockFour) return;
  indexFour++;
  fourSliderlist.style.left = indexFour * -100 + "%";
  fourSliderlist.style.transition = "0.5s ease";

  if (indexFour === 4) {
    indexFour = 0;
    setTimeout(() => {
      fourSliderlist.style.left = 0;
      fourSliderlist.style.transition = "none";
    }, 500);
  }
  setSpanFour();
  lockFour = false;
  setTimeout(function () {
    lockFour = true;
  }, 500);
}
btnFourSliderRight.addEventListener("click", handleRightBtnFour);
//左按钮点击切换
btnFourSliderLeft.addEventListener("click", function () {
  if (!lockFour) return;
  indexFour--;
  if (indexFour === -1) {
    //index等于-1的时候瞬间切换到最后一张假图片
    fourSliderlist.style.transition = "none";
    fourSliderlist.style.left = 4 * -100 + "%";

    indexFour = 3;
    setTimeout(() => {
      //再加上过渡切换到真正的最后一张图片

      fourSliderlist.style.left = indexFour * -100 + "%";
      fourSliderlist.style.transition = "0.5s ease";
    });
  } else {
    fourSliderlist.style.left = indexFour * -100 + "%";
  }
  setSpanFour();
  lockFour = false;
  setTimeout(function () {
    lockFour = true;
  }, 500);
});
//下方按钮实现
const fourbottom = document.querySelectorAll(".sliderFour-span span");
function setSpanFour() {
  for (let i = 0; i < fourbottom.length; i++) {
    //
    // console.log(i);
    if (i === indexFour) {
      fourbottom[i].classList.add("leftactive");
    } else {
      fourbottom[i].classList.remove("leftactive");
      // firSliderlist.style.transition = "0.5s ease";
    }
  }
}

const fourbottomdiv = document.querySelector(".sliderFour-span");
fourbottomdiv.addEventListener("click", (eFour) => {
  if (eFour.target.nodeName.toLowerCase() === "span") {
    const nFour = Number(eFour.target.getAttribute("data-n"));
    indexFour = nFour;
    setSpanFour();
    fourSliderlist.style.left = indexFour * -100 + "%";
  }
});
// 自动轮播
let timerIdFour = setInterval(handleRightBtnFour, 2500);

//移入鼠标暂停
const fourrdSlider = document.querySelector(".slider-four");
fourrdSlider.addEventListener("mouseenter", function () {
  clearInterval(timerIdFour);
});
// 移出鼠标继续
fourrdSlider.addEventListener("mouseleave", function () {
  clearInterval(timerIdFour);
  timerIdFour = setInterval(handleRightBtnFour, 2500);
});
