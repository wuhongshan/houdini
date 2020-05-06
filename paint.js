//paint.js
// Paint API 必须要在支持 https 服务器上或者本地 localhost 上才能使用 
// 记得禁止浏览器缓存，使worklets立马生效 
registerPaint('circle', class {
    // 决定了paint方法中props中能获取的CSS属性值
    // 可以通过props参数获取CSS上下文代码块（指的是paint(circle)在的那个代码块）的其他CSS属性，但是这个属性需要在inputProperties函数中进行声明，声明的方法是在函数中返回一个数组，数组项为属性名称
    static get inputProperties() { return ['--color', '--my-custom-width']; }

    // 绘制一个半径为长或宽的最小值的圆形作为背景
    paint(ctx, size, props, args) {
        // ctx是Canvas的ctx的子集，实现了除文字操作外的大多数方法和属性
        // size表示使用该paint方法的div的长和宽
        // const width = size.width / 2;
        const width = props.get('--my-custom-width').value/2;

        const height = size.height / 2;
        const radius = Math.min(width, height);
        // props.get表示将根据inputProperties返回的键值从CSS代码块中获取相应属性
        const color = props.get('--color');
        // 给画笔着色
        ctx.fillStyle = color;
        // 开始动笔绘制
        ctx.beginPath();
        // 以width,height为圆心，radius为半径画圆圈,从0度画到360度
        ctx.arc(width, height, radius, 0, 2 * Math.PI);
        // 用fillstyle把圆圈轨迹内部进行颜色填充
        ctx.fill();
        // 搞定！
    }
});