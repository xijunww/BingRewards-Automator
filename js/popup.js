import words from '../data/words.js'

// 搜索之间的等待时间
const milliseconds = 6000

// 默认搜索次数
let numberOfSearch = 90 

// 用于 jQuery 的 DOM 元素
const domElements = {
    currentSearchNumber: '#currentSearchNumber',
    totSearchesNumber: '#totSearchesNumber',
    searchButton: '#searchButton',
    totSearchesForm: '#totSearchesForm'
}

// 搜索之间的等待
const timer = ms => new Promise(res => setTimeout(res, ms))

// 进度条对象
let progress = document.querySelector(".progress-bar")

// 在输入框中设置 numberOfSearch 的默认值
$(domElements.totSearchesForm).val(numberOfSearch)

// 使用默认的 numberOfSearch 更新 HTML
$(domElements.totSearchesNumber).html(numberOfSearch)

// 当输入框中的值改变时
$(domElements.totSearchesForm).on('change', function () {
    numberOfSearch = $(domElements.totSearchesForm).val()
    $(domElements.totSearchesNumber).html(numberOfSearch)

})

// 开始搜索
$(domElements.searchButton).on("click", () => {
    doSearches()
})


// xzp的版本

async function doSearches() {

    deactivateForms()

    for (var i = 0; i < numberOfSearch; i++) {

        let randomNumber = Math.floor(Math.random() * words.length)

        chrome.tabs.update({
            url: `https://alfilatov.com/MSEdgeSearchClicker/`
        })

        setProgress( parseInt( ( (i + 1) / numberOfSearch) * 100) )
        
        $(domElements.currentSearchNumber).html(i + 1)
        await timer(milliseconds)
    }

    setProgress(0)
    activateForms()
} 



/**
 * 禁用“开始搜索”按钮
 * 和“搜索次数”表单
 */
function deactivateForms() {
    $(domElements.searchButton).prop("disabled", true)
    $(domElements.totSearchesForm).prop("disabled", true)
}

/**
 * 启用“开始搜索”按钮
 * 和“搜索次数”表单
 */
function activateForms() {
    $(domElements.searchButton).prop("disabled", false)
    $(domElements.totSearchesForm).prop("disabled", false)
}

/**
 * 更新进度条的值
 * @param {*} value 
 */
function setProgress(value){
    progress.style.width = value + "%";
    progress.innerText = value + "%";
}