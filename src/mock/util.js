var Util = {};

/* 深拷贝函数，处理了循环引用的问题。 类似 jQuery  $.extend() 方法。
 * 参数只有一个，则使用调用对象来作为目标对象（target = this）。
 * 有多个参数， 第一个为目标对象，后续为源对象。
 */
Util.extend = function extend() {
    var target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        options,
        name,
        src,
        copy,
        clone;
    // src: 目标对象对象
    // copy： 源对象（进行拷贝的）
    // clone : 拷贝数据的临时变量
    if (length === 1) {
        target = this;
        i = 0;
    }

    for (; i < length; i++) {
        options = arguments[i];
        if (!options) continue;

        for (name in options) {
            src = target[name];
            copy = options[name];

            if (target === copy) continue;
            if (copy === undefined) continue;
            // 代码对数组和对象进行递归复制， 如果存在相同的数据，会进行覆盖， 例如 【1，2，3】 【4，5，6】  = 》 【4，5，6】
            if (Util.isArray(copy) || Util.isObject(copy)) {
                if (Util.isArray(copy))
                    clone = src && Util.isArray(src) ? src : [];
                if (Util.isObject(copy))
                    clone = src && Util.isObject(src) ? src : {};

                target[name] = Util.extend(clone, copy);
            } else {
                target[name] = copy;
            }
        }
    }

    return target;
};

/**
 * number、array、object 类型做了一个循环迭代器
 * 具体操作是拿到值和索引，进行运行 iterator
 */
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

Util.type = function type(obj) {
    return obj === null || obj === undefined
        ? String(obj)
        : Object.prototype.toString
              .call(obj)
              .match(/\[object (\w+)\]/)[1]
              .toLowerCase();
};

Util.each("String Object Array RegExp Function".split(" "), function (value) {
    Util["is" + value] = function (obj) {
        return Util.type(obj) === value.toLowerCase();
    };
});

Util.isObjectOrArray = function (value) {
    return Util.isObject(value) || Util.isArray(value);
};

Util.isNumeric = function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

Util.keys = function (obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) keys.push(key);
    }
    return keys;
};
Util.values = function (obj) {
    var values = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) values.push(obj[key]);
    }
    return values;
};

// 提取多行注释
/*
    ### Mock.heredoc(fn)

    * Mock.heredoc(fn)

    以直观、安全的方式书写（多行）HTML 模板。

    **使用示例**如下所示：

        var tpl = Mock.heredoc(function() {
            /*!
        {{email}}{{age}}
        <!-- Mock {
            email: '@EMAIL',
            age: '@INT(1,100)'
        } -->
            *\/
        })

    **相关阅读**
    * [Creating multiline strings in JavaScript](http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)、
*/
Util.heredoc = function heredoc(fn) {
    // 1. 移除起始的 function(){ /*!
    // 2. 移除末尾的 */ }
    // 3. 移除起始和末尾的空格
    return fn
        .toString()
        .replace(/^[^\/]+\/\*!?/, "")
        .replace(/\*\/[^\/]+$/, "")
        .replace(/^[\s\xA0]+/, "")
        .replace(/[\s\xA0]+$/, ""); // .trim()
};

Util.noop = function () {};
module.exports = Util;
