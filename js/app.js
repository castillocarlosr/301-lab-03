'use strict';
// array for storing obj
const allHorns = [];

const keywords = [];

// constructor function that pushes to array
function Horn(hornObj, hornClass){
    this.image_url = hornObj.image_url;
    this.title = hornObj.title;
    this.description = hornObj.description;
    this.keyword = hornObj.keyword;
    this.horns = hornObj.horns;
    this.hornClass = hornClass;
}
function renderAnyHandlebars(sourceId, data, target){
    let template = Handlebars.compile($(sourceId).html());
    let newHtml =template(data);
    $(target).append(newHtml);
}
Horn.prototype.renderHandlebars = function(){
    let hornSource = $('#horn-handlebars').html();
    let hornTemplate = Handlebars.compile(hornSource);
    let hornHtml = hornTemplate(this);
    $('main').append(hornHtml);   
}
// function that renders all
const renderAllHorns = () => {
    allHorns.forEach(element => {
        renderAnyHandlebars('#horn-handlebars', element, "#horn-container");
    })
}
// function that reads json files and calls render function
let readJson = () => {
    $.getJSON(`./data/page-1.json`, data => { 
        data.forEach(element => {
            allHorns.push(new Horn(element, '1'));
        })
    })
    $.getJSON(`./data/page-2.json`, data => { 
        data.forEach(element => {
            allHorns.push(new Horn(element, '2'));
        })
    })
    .then((res)=>{
        console.log(`res here ${res}`);
        renderAllHorns();
        addKeyword(allHorns,keywords)
        filterKeywords();
        registerListeners();
        
    });    
}
// addes keywords to dropdown makes sure no repeat
function addKeyword(arr,keywordsArr){
    arr.forEach((e) =>{
        if(keywordsArr.includes(e.keyword)){          
        }else{            
            keywordsArr.push(e.keyword);
            $('select').append('<option value ='+e.keyword+ '>'+e.keyword+'</option>');
        }
    })
}
function showPage(){
    $('#1').on('click', function(){
        console.log('PAGE_1 YAYYYYYYYY');
        $('.2').hide();
        $('.1').show();
    });
    
    $('#2').on('click', function(){
        console.log('PAGE_2 YAYYYYYYYY');
        $('.1').hide();
        $('.2').show();
    });
    
    $('#all').on('click', function(){
        console.log('All YAYYYYYYYY');
        $('.1').hide();
        $('.2').hide();
        $('.1').show();
        $('.2').show(); 
    
    });
}
function addDropdown(){
    $('select').append('<option> Filter by Name </option>');
}
function filterKeywords(){
    $('.select').on('change', handleFilter);

    function handleFilter (){
        event.preventDefault();
        $('section').hide();
        var selectedValue = $('option:selected').val();
        $(`.${selectedValue}`).show();
        console.log(selectedValue);

        if(selectedValue === 'showAll'){
            $('section').show();
        }
    }
}
function registerListeners() {
    $('form').on('change','input',  sortImages);

    function sortImages () {
        console.log('hi');
       let sortType = $(this).data('sortby');
       console.log(sortType);
   
       allHorns.sort((a,b) => {
         let flag = 0;
         if(a[sortType] > b[sortType]){
           flag = 1;
         } else if( a[sortType] < b[sortType]){
           flag = -1;
         }
         return flag
       })
       $('section').remove();
       renderAllHorns();
       
     }
  }
function loadPage(arr){
    readJson();
    addKeyword(arr);
    showPage();
}
 loadPage(allHorns);
