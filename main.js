// الحمد لله
// بسم الله الرحمن الرحيم
// ملاحظات 
// 0: اسم الموقع المزارع
// 1: يمكن اضافة بداية ونهاية لخطة العلف وانشاء تذكير بهذا الموقع
// 2: إضافة الة حاسبة لحساب أسعار الأصناف
// 3: اضافة فلترلفرز العناصر حسب الاحدث او الاقدم نوع الحيوان
// 4: <إضافة ايقونة الثلاث نقاط الراسية التسي عندما يتم الضغظ عليها
// يعرض معلومات البطاقة مثل نو ع الحيوان تاريخ الانشاء
//  تعديل حذف تكرار حفظ على الجهاز كملف اكسل مع علامة مائية>
// 5: إضافة خيار يوضح عند الضغط على زر إنشاء خطة يضيف خطة ويحذف البيانات اويضيف الخطة وترك البيانات
// 6: انشاء مرشد في الموفع ويجب انشاءه  بعد الإنتهاء من تصميم الموقع
// program moods
let ingred_unit_mood='killo';
// show button calculate
function showbtnCalculate(){
    document.querySelector("tfoot #tfootlastelement").innerHTML=`
    <tr>
    <td colspan="3" id="tdCalculate" style="padding: 5px 0px;"><button onclick='Calculate()' id="Calculate">احسب</button></td>
    </tr>
   `;
};
let index=0;
let tbody=document.getElementById("tbody")
// get all tfoot items value
function Calculate(){
    // get (ingredients && much && price) value
        document.querySelector("tfoot #tfootlastelement").innerHTML=`
        <tr>
        <td>العدد :<span id="count_ingrad">0</span></td>
        <td>الكمية: <span id="size_ingrad">0</span><u style="margin-right:3px;font-weight: 100;text-decoration: none;">كيلو</u></td>
        <td>السعر: <span id="price_ingrad">0</span><u style="margin-right:3px;font-weight: 100;text-decoration: none;">جنيه</u></td>
        </tr>
       `;
        let count_ingrad=document.getElementById("count_ingrad");
        let size_ingrad=document.getElementById("size_ingrad");
        let price_ingrad=document.getElementById("price_ingrad");
        for(let index=0;index<tbody.children.length;index++){
            let ingred_much=document.querySelector(`#ingred_much${index}`).value;
            let select=document.querySelector(`#ingred_unit${index}`).value;
            let ingred_price=document.querySelector(`#ingred_price${index}`).value;
               if(select =='جرام'){
                    size_ingrad.textContent= +size_ingrad.textContent + +ingred_much /1000;
                }
                else{
                    size_ingrad.textContent= +size_ingrad.textContent + +ingred_much;
                }
                count_ingrad.textContent=tbody.children.length;
                price_ingrad.textContent= +price_ingrad.textContent + +ingred_price;
       }
}
// insert new row
let new_ingrid=document.getElementById("new_ingrid");
let deletmenu=document.querySelector(".deletThis");
let movei;
new_ingrid.onclick=function(){
        let frstTR=document.createElement("tr");
        frstTR.id=`row${index}`;
        frstTR.innerHTML=`
        <td id='td0${index}'><input type="text" dir="rtl" placeholder="المكون" id="ingred_inp${index}"  class="inp_name" oninput="showbtnCalculate();"></td>
        <td class="unit_items" id='td1${index}' >
            <div>
            <input type="number" dir="rtl" placeholder="الكمية" id="ingred_much${index}" oninput='showbtnCalculate();' class="inp_much">
            <select name="unit"  id="ingred_unit${index}" class='ingred_unit' onchange='showbtnCalculate()'>
                <option value="كيلو">كيلو</option>
                <option value="جرام">جرام</option>
            </select>
            </div>
        </td>
        <td id='td2${index}'><input type="number" dir="rtl" placeholder="السعر" id="ingred_price${index}" class="inp_price" oninput='showbtnCalculate();'></td>
            `
        showbtnCalculate()
        tbody.append(frstTR)
        deletmenu.innerHTML+=`
        <li data-id="row${index}" class='deletrow${index}' onclick='delerow(this)'>-</li>
        `;
        // focus on ingredient cell
        document.querySelector(`#ingred_inp${index}`).focus();
        index=index+1;
    }
// delet row
function delerow(e){
    document.querySelector(`#${e.getAttribute('data-id')}`).remove();
    e.remove();
    index=index-1;
    if(tbody.children.length==0){
        document.querySelector("tfoot #tfootlastelement").innerHTML=``;
    }
    else{
       showbtnCalculate();
    } 
    // tr/s loop 
    for(let newid=0;newid<tbody.children.length;newid++){
        // tr/s items loop
        document.querySelectorAll(`tbody tr`)[newid].id=`row${newid}`;
        document.querySelector(`#row${newid} td input`).id=`ingred_inp${newid}`;
        document.querySelector(`#row${newid} td div input`).id=`ingred_much${newid}`;
        document.querySelector(`#row${newid} td div select`).id=`ingred_unit${newid}`;
        document.querySelectorAll(`#row${newid} td`)[2].querySelector("input").id=`ingred_price${newid}`;
        document.querySelectorAll(".deletThis li")[newid].className=`deletrow${newid}`;
        document.querySelectorAll(".deletThis li")[newid].setAttribute('data-id',`row${newid}`)
    }
}
// create map
let btncreate=document.getElementById("createmap")
let mapsArray=[];
let kindanimal=document.getElementById("kindanimal");
let kindanimal2=document.getElementById("kindanimal2");
let map_duration=document.getElementById("duration");
let map_duration2=document.getElementById("duration2");
let food_Gradualism=document.getElementById("Gradualism");
let food_Gradualism2=document.getElementById("Gradualism2");
let method=document.getElementById("method");
let notes=document.getElementById("notes");
let kindan='none';
kindanimal.onchange=function(){
    kindan=kindanimal.value;
    kindanimal2.value=this.value;
}
kindanimal2.onchange=function(){
    kindan=kindanimal2.value;
    kindanimal.value=this.value;
}
// General variable
let newItem;
// tbody in show table
let tbodyindex=0;
let nullelements=0;
btncreate.onclick=function(){
    // lacal variable
    newItem={
        kindanimal:kindan,
        map_duration:map_duration.value,
        food_Gradualism:food_Gradualism.value+" "+ "جرام",
        method:method.value,
        notes:notes.value,
        // Table features
        table_tbody_length:tbody.children.length,
        table_ingredient_name:[],
        table_ingredient_amount:[],
        table_ingredient_amount_unit:[],
        table_ingredient_price:[],
    }
    nullelements=0;
    for(let ele=0;ele<tbody.children.length;ele++){
        let input1=document.querySelector(`#ingred_inp${ele}`);
        let input2=document.querySelector(`#ingred_much${ele}`);
        let input3=document.querySelector(`#ingred_price${ele}`);
        if(input1.value==''){
            nullelements++;
            document.querySelector(`.deletrow${ele}`).style.background='white';
        }
        else{
            document.querySelector(`.deletrow${ele}`).style.background='transparent';
        }
        if(input2.value==''){
            nullelements++;
            document.querySelector(`.deletrow${ele}`).style.background='white';
        }
        else{
            document.querySelector(`.deletrow${ele}`).style.background='transparent';
        }
        if(input3.value==''){
            nullelements++;
            document.querySelector(`.deletrow${ele}`).style.background='white';
        }
        else{
            document.querySelector(`.deletrow${ele}`).style.background='transparent';
        }
    }
    if(kindanimal.value=='' || map_duration.value==''){
        document.querySelector(".first").style.border='2px solid red';
        document.querySelector(".first2").style.border='2px solid red';
    }
    else{
        document.querySelector(".first").style.border='none';
        document.querySelector(".first2").style.border='none'; 
    }
    if(tbody.children.length==0){
        document.querySelector(".secound").style.border='2px solid red';
    }
    else{
        document.querySelector(".secound").style.border='none';
    }
    if(food_Gradualism.value=='' && food_Gradualism2.value==''){
        newItem.food_Gradualism='لم تكتب';
    }
    else{
        newItem.food_Gradualism=(food_Gradualism.value || food_Gradualism2.value) + " " + "جرام";
    }
    if(method.value==''){
        newItem.method='لم تكتب';
    }
    else{
        newItem.method=method.value;
    }
    if(notes.value==''){
        newItem.notes='لم تكيب';
    }
    else{
        newItem.notes=notes.value;
    }
    if(kindanimal.value!='' && map_duration.value!=''&& tbody.children.length && nullelements==0){
        for(let X=0;X<tbody.children.length;X++){
            newItem.table_ingredient_name.push(document.querySelector(`#ingred_inp${X}`).value);
            newItem.table_ingredient_amount.push(document.querySelector(`#ingred_much${X}`).value);
            newItem.table_ingredient_amount_unit.push(document.querySelector(`#ingred_unit${X}`).value);
            newItem.table_ingredient_price.push(document.querySelector(`#ingred_price${X}`).value);
        }
        document.querySelector(".first").style.border='none';
        document.querySelector(".first2").style.border='none';
        tbody.style.border='0';
        mapsArray.push(newItem);
        tbodyindex++;
    }
    showdata();
}
// show data function
// date of today
let count=0;
let data_day=new Date();
function showdata(){
    if(tbody.children.length>0 && nullelements==0 && kindanimal.value!='' && map_duration.value!=''){
    let cards='';
    for(let ind=0;ind<mapsArray.length;ind++){
        cards+=`<div class='card' style='background-image: linear-gradient(to left,rgba(3, 1, 99, 0.800),rgba(33, 33, 33, 0.800)),url(${document.querySelector(`.${mapsArray[ind].kindanimal}`).getAttribute("data-url")})'>
        <div class="frst">
        <div class="time_plus">
            <div class="duration_time">
                مدة هذه الخطة   :
                <span id="map_duration">${mapsArray[ind].map_duration}</span>
                يوم
            </div>
            <div class="plus">
                الزيادة التدريجية اليومية :
                <span id="map_Gradualism">${mapsArray[ind].food_Gradualism}</span>
            </div>
        </div>
        <div class="how_note">
            <div class="howWork">
                <p>الطريقة:</p>
               <span>${mapsArray[ind].method}</span>
            </div>
            <div class="notes">
              <p>ملاحظات :</p>
              <span>${mapsArray[ind].notes}</</span> 
            </div>
        </div>
        </div>
        <div class="table_show">
        <table>
            <caption style="margin-bottom: 5px;font-size: large;font-weight: bold;padding-bottom:6px;" class='caption_table_show'> الجدول</caption>
            <thead>
                <tr>
                    <th dir="ltr">:المكونات</th>
                    <th dir="ltr">:الكمية</th>
                    <th dir="ltr">:السعر (ج)</th>
                </tr>
            </thead>
            <tbody id='tbodyTableShow${ind}'>
           </tbody> 
            <tfoot  id='tfootTableShow${ind}'>
                <tr>
                    <td>العدد : <span id="totale_ingrad_count${ind}"></span></td>
                    <td>الكمية: <span id="totale_ingrad_size${ind}"></span><u style="margin-right:3px;font-weight: 100;text-decoration: none;">كيلو</u></td>
                    <td>السعر : <span id="totale_ingrad_price${ind}"></span><u style="margin-right:3px;font-weight: 100;text-decoration: none;">جنيه</u></td>
                </tr>
            </tfoot>
        </table>
        </div> 
        </div>`;
    }
    count=1;
    document.querySelector(".cards").innerHTML=cards;
        // for loop of mapsArray && in this loop there is loop of table items
        for(let myArrIndex=0;myArrIndex<mapsArray.length;myArrIndex++){
            // innerHTML to maps.Array "forech"
            for(let itemindex=0;itemindex<mapsArray[myArrIndex].table_tbody_length;itemindex++){
                document.querySelector(`#tbodyTableShow${myArrIndex}`).innerHTML+=`
                <tr>
                    <td><span id="span_ingred_name${itemindex}">${mapsArray[myArrIndex].table_ingredient_name[itemindex]}</span></td>
                    <td class="unit_items">
                        <div>
                           <span id="span_amount${itemindex}">${mapsArray[myArrIndex].table_ingredient_amount[itemindex]}</span>
                           <span id='span_unit${itemindex}'>${mapsArray[myArrIndex].table_ingredient_amount_unit[itemindex]}</span>
                        </div>
                    </td>
                    <td><span id="span_price${itemindex}">${mapsArray[myArrIndex].table_ingredient_price[itemindex]}</span></td>
                 </tr>
                `;
                // inputs
                let span_amount=document.querySelector(`#tbodyTableShow${myArrIndex} tr td div #span_amount${itemindex}`);
                let span_unit  =document.querySelector(`#tbodyTableShow${myArrIndex} tr td div #span_unit${itemindex}`);
                let span_price =document.querySelector(`#tbodyTableShow${myArrIndex} tr td #span_price${itemindex}`);
                // outputs 
                let totale_ingrad_size =document.querySelector(`#tfootTableShow${myArrIndex} tr td #totale_ingrad_size${myArrIndex}`);
                let totale_ingrad_count=document.querySelector(`#tfootTableShow${myArrIndex} tr td #totale_ingrad_count${myArrIndex}`);
                let totale_ingrad_price=document.querySelector(`#tfootTableShow${myArrIndex} tr td #totale_ingrad_price${myArrIndex}`);
                // console.log(totale_ingrad_price.textContent)
                if(span_unit.innerHTML =='جرام'){
                    totale_ingrad_size.innerHTML= +totale_ingrad_size.innerHTML + +span_amount.innerHTML /1000;
                }else{
                    totale_ingrad_size.innerHTML= +totale_ingrad_size.innerHTML + +span_amount.innerHTML;
                }
                totale_ingrad_count.innerHTML=mapsArray[myArrIndex].table_tbody_length;
                totale_ingrad_price.innerHTML= +totale_ingrad_price.innerHTML + +span_price.innerHTML;
                clearinptsdata();
            }

        }
    }    
    window.scrollTo({
        left:0,
        top:+window.getComputedStyle(document.querySelector(".cards")).getPropertyValue("height").slice(0,-2),
        behavior:"smooth"
    });
}
// clear inputs data
function clearinptsdata(){
    kindanimal.value='';
    kindanimal2.value='';
    map_duration.value='';
    map_duration2.value='';
    food_Gradualism.value='';
    food_Gradualism2.value='';
    method.value='';
    notes.value='';
    tbody.innerHTML='';
    deletmenu.innerHTML='';
    document.querySelector("tfoot #tfootlastelement").innerHTML="";
    index=0;
    newItem={};
}
// get card background
// save Elements in local storage