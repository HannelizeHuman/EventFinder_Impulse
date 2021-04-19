function searchEats(event){
    console.log("eats!!")
    document.location.href = "restaurant.html"
}

function searchEvents(event){
    console.log("events!!")

    document.location.href = "event.html"
}

$("#restaurants").on("click", searchEats);
$("#events").on("click", searchEvents);

$("[data-menu-underline-from-center] a").addClass("underline-from-center");