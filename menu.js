// ul lis
let menus=document.querySelector(".menus")
let main_menu=document.querySelector(".main_menu");
// parent ul/s
let menu=document.querySelector(".menu")
// button to show menus
let btnmenu=document.querySelector(".btnmenu");
let card_info=document.querySelector(".card_info");
let info=document.querySelector(".main_menu .info");
let bacKtoMainMenu=document.querySelector(".bacKtoMainMenu");
info.onclick=function(){
    main_menu.classList.remove("showmenu")
    card_info.classList.add("showmenu")
    menus.style.animationName="ActiveMenu";
}
bacKtoMainMenu.onclick=function(){
    main_menu.classList.add("showmenu")
    card_info.classList.remove("showmenu")
    menus.style.animationName="NullMenu";
}
btnmenu.onclick=function myFunction() {
    document.querySelector(".btnmenu").classList.toggle("showmenu");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.btnmenu')) {
      var i;
      for (i = 0; i < menu.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('showmenu')) {
          openDropdown.classList.remove('showmenu');
        }
      }
    }
  }