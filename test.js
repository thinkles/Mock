// function extend(){
//   const arg = arguments[0];
//   const length = arguments.length;
//   let target = arguments[0] || {};
//   let i = 0;

//   if(length === 1){
//     target = this;
//     i=0
//   }

//   for(; i < length; i++){
//     // 为空的清况
//     const options = arguments[i];
//     if(!options) continue;

//     for(name in options){
//       // 循环拷贝
//       const src = target[name];
//       const copy = options[name];

//       // 循环引用
//       if(copy === target) continue;
//       if (copy === undefined) continue

//       if()

//     }

//   }

// }

Util.each = function each(obj, iterator, context) {
    var i, key;
    if (this.type(obj) === "number") {
        for (i = 0; i < obj; i++) {
            iterator(i, i);
        }
    } else if (obj.length === +obj.length) {
        for (i = 0; i < obj.length; i++) {
            if (iterator.call(context, obj[i], i, obj) === false) break;
        }
    } else {
        for (key in obj) {
            if (iterator.call(context, obj[key], key, obj) === false) break;
        }
    }
};

Util.each("String Object Array RegExp Function".split(" "), function (value) {
    Util["is" + value] = function (obj) {
        return Util.type(obj) === value.toLowerCase();
    };
});
