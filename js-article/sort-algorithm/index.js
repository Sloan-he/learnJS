/**
 * Created by Admin on 2017/12/3.
 */

//冒泡排序

var arr = [3,44,19,50,48,2,4,36,25,5,47,15,26,85,32]

function bubbleSort(arr){
    var len = arr.length
    for(var i = 0;i < len;i++){
        for(var j = 0;j < len - 1 - i;j++){
            if(arr[j] > arr[j+1]){
                var temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp;
            }
        }
    }
    return arr;
}
console.log(new Date().toLocaleTimeString())
var bubbleSortArr = bubbleSort(arr)
console.log(bubbleSortArr)
console.log(new Date().toLocaleTimeString())


var arr2 = [3,44,19,50,48,2,4,36,25,5,47,15,26,85,1]

//选择排序
function selectionSort(arr){
    var len = arr.length;
    var minIndex, temp;
    for(var i = 0;i < len-1;i++){
        minIndex = i;
        for(var j = i+1;j < len;j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr;
}
console.log(new Date().toLocaleTimeString())
console.log(selectionSort(arr2))
console.log(new Date().toLocaleTimeString())