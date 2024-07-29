//鼠标经过按钮时箭头变色

const btnThiSliderLeft = document.querySelector(".slider-thi-btn-left");
const btnThiSliderRight = document.querySelector(".slider-thi-btn-right");
const arrowThiSliderLeft = document.querySelector("#slider-thi-prev-hover");
const arrowThiSliderRight = document.querySelector("#slider-thi-next-hover");
btnThiSliderLeft.addEventListener("mouseenter", function () {
  arrowThiSliderLeft.style.display = "block";
});
btnThiSliderLeft.addEventListener("mouseleave", function () {
  arrowThiSliderLeft.style.display = "none";
});
btnThiSliderRight.addEventListener("mouseenter", function () {
  arrowThiSliderRight.style.display = "block";
});
btnThiSliderRight.addEventListener("mouseleave", function () {
  arrowThiSliderRight.style.display = "none";
});

const thiSliderlist = document.querySelector(".slider-thi .slider-wrapper");

//克隆第一张图片
const thisliderClone = thiSliderlist.firstElementChild.cloneNode();
// const firsliderlastClone = firSliderlist.lastElementChild.cloneNode();
// 将克隆的图片放到轮播图末尾
thiSliderlist.appendChild(thisliderClone);
// firSliderlist.prepend(firsliderlastClone);
// console.log(firSliderlist);
let indexThi = 0;
//设置节流锁
let lockThi = true;
function handleRightBtnThi() {
  if (!lockThi) return;
  indexThi++;
  thiSliderlist.style.left = indexThi * -100 + "%";
  thiSliderlist.style.transition = "0.5s ease";

  if (indexThi === 3) {
    indexThi = 0;
    setTimeout(() => {
      thiSliderlist.style.left = 0;
      thiSliderlist.style.transition = "none";
    }, 500);
  }
  setSpanThi();
  lockThi = false;
  setTimeout(function () {
    lockThi = true;
  }, 500);
}
btnThiSliderRight.addEventListener("click", handleRightBtnThi);
//左按钮点击切换
btnThiSliderLeft.addEventListener("click", function () {
  if (!lockThi) return;
  indexThi--;
  if (indexThi === -1) {
    //index等于-1的时候瞬间切换到最后一张假图片
    thiSliderlist.style.transition = "none";
    thiSliderlist.style.left = 3 * -100 + "%";

    indexThi = 2;
    setTimeout(() => {
      //再加上过渡切换到真正的最后一张图片

      thiSliderlist.style.left = indexThi * -100 + "%";
      thiSliderlist.style.transition = "0.5s ease";
    });
  } else {
    thiSliderlist.style.left = indexThi * -100 + "%";
  }
  setSpanThi();
  lockThi = false;
  setTimeout(function () {
    lockThi = true;
  }, 500);
});
//下方按钮实现
const thibottom = document.querySelectorAll(".sliderThi-span span");
function setSpanThi() {
  for (let i = 0; i < thibottom.length; i++) {
    //
    // console.log(i);
    if (i === indexThi) {
      thibottom[i].classList.add("leftactive");
    } else {
      thibottom[i].classList.remove("leftactive");
      // firSliderlist.style.transition = "0.5s ease";
    }
  }
}

const thibottomdiv = document.querySelector(".sliderThi-span");
thibottomdiv.addEventListener("click", (eThi) => {
  if (eThi.target.nodeName.toLowerCase() === "span") {
    const nThi = Number(eThi.target.getAttribute("data-n"));
    indexThi = nThi;
    setSpanThi();
    thiSliderlist.style.left = indexThi * -100 + "%";
  }
});
// 自动轮播
let timerIdThi = setInterval(handleRightBtnThi, 2500);

//移入鼠标暂停
const thirdSlider = document.querySelector(".slider-thi");
thirdSlider.addEventListener("mouseenter", function () {
  clearInterval(timerIdThi);
});
// 移出鼠标继续
thirdSlider.addEventListener("mouseleave", function () {
  clearInterval(timerIdThi);
  timerIdThi = setInterval(handleRightBtnThi, 2500);
});
