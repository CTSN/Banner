/**
 * Created by roy on 2017/6/25.
 */
function $(id) {
    return document.getElementById(id);
}
window.onload = function () {
    var slider = $("slider");
    var jsSlider = $("js_slider");
    var slider_ctrl = $("slider_ctrl");
    var imgList = jsSlider.children;
    var ctrlList = slider_ctrl.children;
    var sliderWidth = slider.offsetWidth;
    var index = 0;
    initImg();
    initSliderCtrl();
    initSliderCtrlClick();

    function initImg() {
        for (var i = 1; i < imgList.length; i++) {
            imgList[i].style.left = sliderWidth + "px";
        }
    }

    function initSliderCtrl() {

        for (var i = 0; i < imgList.length; i++) {
            var span = document.createElement("span");
            span.className = "slider_ctrl_span";
            span.innerHTML = imgList.length - i-1;
            slider_ctrl.insertBefore(span, slider_ctrl.children[1]);
        }

        slider_ctrl.children[1].className = "slider_ctrl_span current";
    }

    function initSliderCtrlClick() {

        for (var i = 0; i < ctrlList.length; i++) {
            ctrlList[i].onclick = function () {

                if (this.className == "slider_prev") {
                    animate(imgList[index--], {left: sliderWidth});
                    //第一张结束 返回最后一张
                    if (index == -1) {
                        index = imgList.length - 1;
                    }
                    //预备动作
                    imgList[index].style.left = (-sliderWidth) + "px";

                    animate(imgList[index], {left: 0});
                }
                else if (this.className == "slider_next") {
                    autoPlay();
                }
                else {

                    var selectIndex = parseInt(this.innerText);
                    //点击相同指示器不处理
                    if (selectIndex != index) {
                        if (index > selectIndex) {
                            //预备动作
                            imgList[selectIndex].style.left = -sliderWidth + "px";
                            animate(imgList[index], {left: sliderWidth});
                        } else {
                            imgList[selectIndex].style.left = sliderWidth + "px";
                            animate(imgList[index], {left: -sliderWidth});
                        }
                        index = selectIndex;
                        animate(imgList[index], {left: 0});
                    }
                }
                //指示器
                initIndicator(index);
            }
        }
    }

    var t = setInterval(autoPlay,4000);

    function autoPlay() {
        animate(imgList[index++], {left: -sliderWidth});
        //判断是否这是最后一张
        if (index > imgList.length - 1) {
            index = 0;
        }
        imgList[index].style.left = sliderWidth + "px";
        animate(imgList[index], {left: 0});

        initIndicator(index);
    }


    function initIndicator(currentIndex){
        for (var i = 1; i <= imgList.length; i++) {
            ctrlList[i].className = "slider_ctrl_span";
        }
        ctrlList[currentIndex + 1].className = "slider_ctrl_span current";
    }

    function showOrMissCtrl(isShow) {
        if (isShow){
            ctrlList[0].style.display = "block";
            ctrlList[ctrlList.length-1].style.display = "block";
        }else{
            ctrlList[0].style.display = "none";
            ctrlList[ctrlList.length-1].style.display = "none";
        }
    }

    slider.onmouseover = function () {
        clearInterval(t);
        showOrMissCtrl(true);
    }
    slider.onmouseout = function () {
        t = setInterval(autoPlay,4000);
        showOrMissCtrl(false);
    }

}