package main
 
import (
	"fmt"
	"math/rand"
	"strconv"
	"syscall/js"
	"time"
)

const (
	width  = 400
	height = 400
)

// 生成 0 - 1 的随机数
func getRandomNum() float32 {
	rand.New(rand.NewSource(time.Now().UnixNano()))
	n := float32(rand.Intn(10000))
	return n / 10000.0
}

// 生成 0 - 10 的随机数
func getRandomNum2() float32 {
	rand.New(rand.NewSource(time.Now().UnixNano()))
	n := float32(rand.Intn(10000))
	return n / 1000.0
}

// 使用 canvas 绘制随机图
func draw() {
	var canvas js.Value = js.
		Global().
		Get("document").
		Call("getElementById", "canvas")

	var context js.Value = canvas.Call("getContext", "2d")

	// reset
	canvas.Set("height", height)
	canvas.Set("width", width)
	context.Call("clearRect", 0, 0, width, height)

	// 随机绘制 50 条直线
	var clineStyle = `rgba(%d, %d, %d, 0.5)`
	for i := 0; i < 50; i++ {
		lineStyle := fmt.Sprintf(clineStyle, 155+int(getRandomNum2()*10), 155+int(getRandomNum()*100), 155+int(getRandomNum()*100))
		fmt.Println(lineStyle)
		context.Call("beginPath")
		context.Set("strokeStyle", lineStyle)
		context.Call("moveTo", getRandomNum()*width, getRandomNum()*height)
		context.Call("lineTo", getRandomNum()*width, getRandomNum()*height)
		context.Call("stroke")
	}

	context.Set("font", "30px Arial")
	context.Set("strokeStyle", "blue")
	for i := 0; i < 10; i++ {
		context.Call("strokeText", "hello wasm", (getRandomNum2()+1)*10+getRandomNum2()*10, (getRandomNum2()+1)*10+getRandomNum2()*50)
	}
}

func registerCallbackFunc() {
	cb := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("button clicked")

		num1 := getElementByID("num1").Get("value").String()
		v1, err := strconv.Atoi(num1)
		if nil != err {
			fmt.Println("button clicked:", num1, err.Error())
			jsAlert().Invoke(err.Error())
			// panic(err)
			return nil
		}

		num2 := getElementByID("num2").Get("value").String()
		v2, err := strconv.Atoi(num2)
		if nil != err {
			fmt.Println("button clicked:", num2, err.Error())
			// panic(err)
			return nil
		}

		rlt := v1 + v2
		getElementByID("rlt").Set("value", rlt)

		return nil
	})

	getElementByID("compute").Call("addEventListener", "click", cb)
}

func getElementByID(id string) js.Value {
	return js.Global().Get("document").Call("getElementById", id)
}

func jsAlert() js.Value {
	return js.Global().Get("alert")
}

func main() {
	fmt.Println("Hello, Go WebAssembly!")
	draw()
	// 通过js.Global().Get()拿到全局alert函数的引用
	alert := js.Global().Get("alert")
	// 调用alert.Invoke来调用alert函数
	alert.Invoke("hello world")

	registerCallbackFunc()
}