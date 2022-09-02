//将传递过来的data对象数据，转化为 查询字符串 格式
function dadaTrans(data){
    let arr = []
    for( let k in data){
        let str = k + '=' + data[k]
        arr.push(str)
    }
    //用&拼接
    return arr.join('&')
}

function selfAjax(options){
    //1.创建 xhr 对象
    let xhr = new XMLHttpRequest()

    //接收查询参数
    let qs = dadaTrans(options.data)

    //2.判断请求的方式
    if(options.method.toUpperCase() === 'GET'){
        //2.1  get请求方式,调用open函数
        xhr.open('GET',options.url + '?' + qs)
        //3.1调用send()
        xhr.send()

    }else if(options.method.toUpperCase() === 'POST'){
        //2.2  post请求方式,调用open函数
        xhr.open('POST',options.url)
        //3.2 
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        //4.2
        xhr.send(qs)
    }
    //3. onreadystatechange
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            let res = JSON.parse(xhr.responseText)
            options.success(res)
        }
    }
    
}