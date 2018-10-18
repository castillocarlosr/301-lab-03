'use strict';

// constructor function that pushes to array
function Horn(hornObj, hornClass){
    this.image_url = hornObj.image_url;
    this.title = hornObj.title;
    this.description = hornObj.description;
    this.keyword = hornObj.keyword;
    this.horns = hornObj.horns;
    this.hornClass = hornClass;

    // allHorns.push(this);
}

// array for storing obj
const allHorns = [];

// prototype.render (renders 1 items)
// Horn.prototype.render = function() {
//     $('main').append('<div class = "clone" ></div>');
//     let $hornContainer = $('div.clone');

//     // grabs inner html of section
//     let $clonedHorn = $('#photo-template').html();

//     $hornContainer.html($clonedHorn);
//     $hornContainer.find('h2').text(this.title);
//     $hornContainer.find('img').attr('src', this.image_url);
//     $hornContainer.find('p').text(this.description);
    // $hornContainer.attr('class', `${this.keyword} ${this.hornClass}`);
//     // gets rid of class
//     $hornContainer.removeClass("clone");
// };

Horn.prototype.renderHandlebars = function(){
    let hornSource = $('#horn-handlebars').html();
    let hornTemplate = Handlebars.compile(hornSource);

    let hornHtml = hornTemplate(this);

    $('main').append(hornHtml);
    
    
}

function renderAnyHandlebars(sourceId, data, target){
    let template = Handlebars.compile($(sourceId).html());
    let newHtml =template(data);
    $(target).append(newHtml);
    // $(target).attr('class', `${this.keyword} ${this.hornClass}`);
    console.log(target);
    console.log(data);
    console.log(sourceId);
    
}

// function that renders all
const renderAllHorns = () => {
    allHorns.forEach(element => {
        renderAnyHandlebars('#horn-handlebars', element, "#horn-container");
        // let $element=element;
        // $element.attr('class', `${this.keyword} ${this.hornClass}`);
        // console.log(element);
    })
    addKeyword(allHorns);
}


// function that reads json files and calls render function
let readJson = (page) => {
    $.getJSON(`./data/page-${page}.json`, data => { 
        data.forEach(element => {
            allHorns.push(new Horn(element, page));
        })
    }) .then(renderAllHorns);
    
}


readJson('1');
readJson('2');




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





// addes keywords to dropdown makes sure no repeat
function addKeyword(arr){
    const keywords = [];
    console.log('Hellow');

    arr.forEach(e =>{

        if(keywords.includes(e.keyword)){
            console.log('IN ARRAY!!!');           
        }else{
            console.log('adding to keywords arr');
            
            keywords.push(e.keyword);
            $('select').append('<option value ='+e.keyword+ '>'+e.keyword+'</option>');
            console.log('hii' + keywords);
        }
    })
}



$('.select').on('change', handleFilter);



function handleFilter (event){
    event.preventDefault();
    $('div').hide();
    var selectedValue = $('option:selected').val();

//add a loop to check each element
    allHorns.forEach(element => {
         if(selectedValue === element.keyword){
            $(`div.${selectedValue}`).show();
         }
    })
}


// $('#page-1').on('click', function(){
//     $('div').hide();
//     console.log('y0000');
    
// });

