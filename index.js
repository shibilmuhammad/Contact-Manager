document.getElementById("loginPage").style.display = "none";
document.getElementById("addCard").addEventListener("click", hidecards);
document.getElementById("submitButton").addEventListener("click", formValidation);

var idlist = [];
var statusO = ""
var noEditEmail;
var noEditPhone;
var nameBfEdit;
var emailBfEdit;
var phoneBfEdit;

function hidecards() {
    document.getElementById("phone").readOnly = false;
    statusO = "no-edit"
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    let inavlidName = document.getElementById("invalidName");
    let inavlidEmail = document.getElementById("invalidEmail");
    let inavlidNumber = document.getElementById("invalidNumber");
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");

    inavlidName.style.display = "none"

    name.style.borderWidth = "0px";
    name.style.borderColor = "red";
    inavlidEmail.style.display = "none"

    email.style.borderWidth = "0px";
    email.style.borderColor = "red";
    inavlidNumber.style.display = "none"

    phone.style.borderWidth = "0px";
    phone.style.borderColor = "red";

    document.getElementById("loginPage").style.display = "flex";
}

function formValidation() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");

    let inavlidName = document.getElementById("invalidName");
    let inavlidEmail = document.getElementById("invalidEmail");
    let inavlidNumber = document.getElementById("invalidNumber");

    const nameRegx = /^[a-zA-Z\s]+$/
    const emailRegx = /^([a-z0-9\.-]+)@([a-z]+).([a-z]{2,8})(.[a-z]{2,8})?$/
    const phoneRegx = /^[0-9]+$/

    namecheck();
    function namecheck() {
        inavlidNumber.style.display = "none";
        phone.style.borderWidth = "0px";
        if (name.value.trim() === "") {
            inavlidName.style.display = "block"
            inavlidName.innerText = "Please enter your name"
            name.style.borderWidth = "2px";
            name.style.borderColor = "red";
        } else if (nameRegx.test(name.value) == ! true) {
            inavlidName.style.display = "block"
            inavlidName.innerText = "Only Letters are allowed"
            name.style.borderWidth = "2px";
            name.style.borderColor = "red";
        }
        else if (name.value.length > 20) {
            inavlidName.style.display = "block"
            inavlidName.innerText = "Max 20 letters allowed"
            name.style.borderWidth = "2px";
            name.style.borderColor = "red";
        }
        else {
            emailcheck();
        }
    }
    function emailcheck() {
        inavlidName.style.display = "none "
        name.style.borderWidth = "0px";
        if (email.value.trim() === "") {
            inavlidEmail.style.display = "block"
            inavlidEmail.innerText = "Please enter Email"
            email.style.borderWidth = "2px";
            email.style.borderColor = "red";
        } else if (emailRegx.test(email.value) == ! true) {
            inavlidEmail.style.display = "block"
            inavlidEmail.innerText = "Email format is not valid"
            email.style.borderWidth = "2px";
            email.style.borderColor = "red";
        } else if (email.value.length > 32) {
            inavlidEmail.style.display = "block"
            inavlidEmail.innerText = "Max 32 letters allowed"
            email.style.borderWidth = "2px";
            email.style.borderColor = "red";
        } else {
            Numbercheck();
        }
    }

    function Numbercheck() {
        inavlidEmail.style.display = "none";
        email.style.borderWidth = "0px";

        if (phone.value.trim() === "") {
            inavlidNumber.style.display = "block"
            inavlidNumber.innerText = "Please enter your number"
            phone.style.borderWidth = "2px";
            phone.style.borderColor = "red";
        } else if (phoneRegx.test(phone.value) == ! true) {
            inavlidNumber.style.display = "block"
            inavlidNumber.innerText = "Only numbers are allowed"
            phone.style.borderWidth = "2px";
            phone.style.borderColor = "red";

        } else if (phone.value.length !== 10) {
            inavlidNumber.style.display = "block"
            inavlidNumber.innerText = "number Must be 10 digit number"
            phone.style.borderWidth = "2px";
            phone.style.borderColor = "red";
        }
        else {
            if (localStorage.getItem("contacts") === null) {

                document.getElementById("card-container-id").style.display = "grid";

                document.getElementById("loginPage").style.display = "none";

                let details = {
                    userNameEntred: name.value.toUpperCase(),
                    emailEntered: email.value,
                    numberEntered: phone.value

                }
                details = JSON.stringify(details);
                var detailsArray = [];
                if (localStorage.getItem("contacts") === null) {
                    detailsArray = [];
                } else {
                    detailsArray = JSON.parse(localStorage.getItem("contacts"))
                }
                detailsArray.push(details);
                let ArrayString = JSON.stringify(detailsArray);
                localStorage.setItem("contacts", ArrayString);
                creatcard(name.value.toUpperCase(), email.value, phone.value);
            } else {

                alreadyExist(name.value, email.value, phone.value);
            }
        }

    }
}
function alreadyExist(entredName, entredEmail, entredNumber) {
    if (statusO == "edit") {
        if (entredName == nameBfEdit &&
            entredEmail == emailBfEdit) {
            document.getElementById("Nochanges").style.display = "block";
        } else if (entredName !== nameBfEdit || entredEmail !== emailBfEdit) {
            if (entredName !== nameBfEdit) {
                document.getElementById("Nochanges").style.display = "none";
                let editArray = JSON.parse(localStorage.getItem("contacts"));
                for (i = 0; i < editArray.length; i++) {
                    if (JSON.parse(editArray[i]).numberEntered == entredNumber) {
                        let editArrayObj = JSON.parse(editArray[i]);
                        editArrayObj.userNameEntred = entredName.toUpperCase();
                        editArray[i] = JSON.stringify(editArrayObj);
                        editArray = JSON.stringify(editArray);
                        localStorage.setItem("contacts", editArray);
                        break;
                    }
                }
            }
            if (entredEmail !== emailBfEdit) {
                let inavlidEmail = document.getElementById("invalidEmail");
                let email = document.getElementById("email");
                let alreadyArray = JSON.parse(localStorage.getItem("contacts"));
                for (i = 0; i < alreadyArray.length; i++) {
                    let emailInArray = JSON.parse(alreadyArray[i]).emailEntered;
                    if (entredEmail == emailInArray) {
                        inavlidEmail.style.display = "block"
                        inavlidEmail.innerText = "Email is already in use";
                        email.style.borderWidth = "2px";
                        email.style.borderColor = "red";
                        break;
                    } else {
                        let editArray = JSON.parse(localStorage.getItem("contacts"));
                        for (i = 0; i < editArray.length; i++) {
                            if (JSON.parse(editArray[i]).numberEntered == entredNumber) {
                                let editArrayObj = JSON.parse(editArray[i]);
                                editArrayObj.emailEntered = entredEmail;
                                editArray[i] = JSON.stringify(editArrayObj);
                                editArray = JSON.stringify(editArray);
                                localStorage.setItem("contacts", editArray);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            document.getElementById("card-container-id").style.display = "grid";
            document.getElementById("loginPage").style.display = "none";
            for (let i of idlist) {
                document.getElementById(i).remove();
            }
            idlist = [];
            displayHome();
        }
    } else {
        let inavlidName = document.getElementById("invalidName");
        let inavlidEmail = document.getElementById("invalidEmail");
        let inavlidNumber = document.getElementById("invalidNumber");
        let alreadyArray = JSON.parse(localStorage.getItem("contacts"));
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let phone = document.getElementById("phone");
        let conditionCheck = false;

        for (i = 0; i < alreadyArray.length; i++) {
            let nameInArray = JSON.parse(alreadyArray[i]).userNameEntred;
            let emailInArray = JSON.parse(alreadyArray[i]).emailEntered;
            let phoneInArray = JSON.parse(alreadyArray[i]).numberEntered;
            if (entredName === nameInArray) {
                inavlidName.style.display = "block"
                inavlidName.innerText = "User name is already in use"
                name.style.borderWidth = "2px";
                name.style.borderColor = "red";
                conditionCheck = false;
                break;
            } else if (entredEmail == emailInArray) {
                inavlidEmail.style.display = "block"
                inavlidEmail.innerText = "Email is already in use";
                email.style.borderWidth = "2px";
                email.style.borderColor = "red";
                conditionCheck = false;
                break;
            } else if (entredNumber == phoneInArray) {
                inavlidNumber.style.display = "block"
                inavlidNumber.innerText = "Number is already in use"
                phone.style.borderWidth = "2px";
                phone.style.borderColor = "red";
                conditionCheck = false;
                break;
            }
            else {
                conditionCheck = true;
            }
        }
        if (conditionCheck && statusO !== "edit") {
            document.getElementById("card-container-id").style.display = "grid";
            document.getElementById("loginPage").style.display = "flex";
            let details = {
                userNameEntred: name.value.toUpperCase(),
                emailEntered: email.value,
                numberEntered: phone.value
            }
            details = JSON.stringify(details);
            var detailsArray = [];
            if (localStorage.getItem("contacts") === null) {
                detailsArray = [];
            } else {
                detailsArray = JSON.parse(localStorage.getItem("contacts"))
            }
            detailsArray.push(details);
            let ArrayString = JSON.stringify(detailsArray);
            localStorage.setItem("contacts", ArrayString);
            creatcard(name.value.toUpperCase(), email.value, phone.value)
        }
    }
}
displayHome();
function displayHome() {
    var detailsArray = [];
    if (localStorage.getItem("contacts") === null) {
        detailsArray = [];
    } else {
        detailsArray = JSON.parse(localStorage.getItem("contacts"))
        for (i = 0; i < detailsArray.length; i++) {
            let nameofuser = JSON.parse(detailsArray[i]).userNameEntred;
            let emailofuser = JSON.parse(detailsArray[i]).emailEntered;
            let numberofuser = JSON.parse(detailsArray[i]).numberEntered;
            creatcard(nameofuser, emailofuser, numberofuser)
        }
    }
}
function creatcard(userNameEntred, emailEntered, numberEntered) {
    
    let card = document.createElement("div");
    card.id = numberEntered;
    idlist.push(numberEntered);
    card.className = "card bg-[#7d7c7c] px-3 py-4  rounded-xl shadow-gray-800 shadow-lg relative md:w-full flex flex-col flex-wrap overflow-hidden";
    let cardHead = document.createElement("div");
    cardHead.className = "cardHead flex items-center"
    card.appendChild(cardHead);

    let imageAndCircle = document.createElement("div")
    imageAndCircle.className = "imageAndCircle bg-[#ccc8aa] xl:h-24 xl:w-24 h-24 w-24 lg:h-32 lg:w-32 rounded-full  relative flex items-center justify-center";
    cardHead.appendChild(imageAndCircle);

    let userImage = document.createElement("img");
    userImage.src = "asset/user.png";
    userImage.className = "lg:h-[88px] h-16 xl:h-16";
    imageAndCircle.appendChild(userImage);

    let nameAndRectangle = document.createElement("div");
    nameAndRectangle.className = "nameAndRectangle bg-[#ccc8aa] xl:text-sm w-full h-fit   lg:text-2xl font-semibold px-8 py-2 ml-[-13px] md:text-2xl text-mainBlack rounded-r-lg";
    cardHead.appendChild(nameAndRectangle);

    let userName = document.createTextNode(userNameEntred);
    nameAndRectangle.appendChild(userName);

    let emailAndPhonetext = document.createElement("div");
    emailAndPhonetext.className = "emailAndPhone xl:ml-[4rem] xl:text-sm xl:mt-1  text-[#f1efef] lg:ml-24 ml-[5rem] text-sm -mt-3 mb-6 lg:text-xl ";
    card.appendChild(emailAndPhonetext);
    let emailh1 = document.createElement("h1");
    emailAndPhonetext.appendChild(emailh1);
    let emailText = document.createTextNode(emailEntered);
    emailh1.appendChild(emailText);

    let phoneh1 = document.createElement("h1");
    emailAndPhonetext.appendChild(phoneh1);
    let PhoneText = document.createTextNode("Number : " + numberEntered);
    phoneh1.appendChild(PhoneText);

    let editAndTrash = document.createElement("div");
    editAndTrash.className = " absolute top-2 right-3 flex space-x-6 ";
    card.appendChild(editAndTrash);

    let trashButton = document.createElement("button");
    trashButton.addEventListener("click", function () {
        document.getElementById(numberEntered).remove(); deleteCard(numberEntered);
    })

    editAndTrash.appendChild(trashButton);
    let trashimage = document.createElement("img");
    trashimage.src = "asset/trash-can.png";
    trashimage.className = "lg:h-7 lg:w-6 mt-1 h-5 w-4 xl:h-5 xl:w-4";
    trashButton.appendChild(trashimage);

    let editButton = document.createElement("button");
    editButton.addEventListener("click", function () {
        statusO = "edit"
        noEditEmail = false;
        noEditPhone = false;
        document.getElementById("loginPage").style.display = "flex";
        let toInputNameArray = JSON.parse(localStorage.getItem("contacts"));
        document.getElementById("phone").readOnly = true;
        for (i = 0; i < toInputNameArray.length; i++) {
            let toInputName = JSON.parse(toInputNameArray[i]).userNameEntred;
            let toInputEmail = JSON.parse(toInputNameArray[i]).emailEntered;
            let toInputNumber = JSON.parse(toInputNameArray[i]).numberEntered;
            if (toInputNumber == numberEntered) {
                document.getElementById("name").value = toInputName;
                document.getElementById("email").value = toInputEmail;
                document.getElementById("phone").value = toInputNumber;
            }
        }
        nameBfEdit = document.getElementById("name").value
        emailBfEdit = document.getElementById("email").value
        phoneBfEdit = document.getElementById("phone").value
    })
    editAndTrash.appendChild(editButton);
    let editimage = document.createElement("img");
    editimage.src = "asset/edit-button.png";
    editimage.className = "lg:h-9 h-7 xl:h-7";
    editButton.appendChild(editimage);

    let callAndMailIcon = document.createElement("div");
    callAndMailIcon.className = "callAndMail flex justify-center space-x-5callAndMail flex justify-center space-x-5";
    card.appendChild(callAndMailIcon);

    let emailCircle = document.createElement("button");
    emailCircle.addEventListener("click", function () {
        window.open(`mailto:${emailEntered}`)
    })
    emailCircle.className = "circle  w-8 h-8 rounded-full bg-[#f1efef] flex items-center justify-center px-2";
    callAndMailIcon.appendChild(emailCircle);
    let emailImage = document.createElement("img");
    emailImage.src = "asset/email.png";
    emailImage.className = "w-6";
    emailCircle.appendChild(emailImage);

    let callCircle = document.createElement("button");
    callCircle.addEventListener("click", function () {
        window.open(`tel:+91 ${numberEntered}`)
    })
    callCircle.className = "circle  w-8 h-8 rounded-full bg-[#f1efef] flex items-center justify-center px-2";
    callAndMailIcon.appendChild(callCircle);

    let callImage = document.createElement("img");
    callImage.src = "asset/call.png";
    callImage.className = "w-6";
    callCircle.appendChild(callImage);

    let cardContainer = document.getElementById("card-container-id");
    cardContainer.appendChild(card);
    document.getElementById("loginPage").style.display = "none";
}
document.getElementById("clearAll").addEventListener("click", function () {
    alert("All Cards will be removed")
    localStorage.clear();
    for (let i of idlist) {
        document.getElementById(i).remove();
    }
    idlist = [];
})
function deleteCard(CardId) {
    let newArray = JSON.parse(localStorage.getItem("contacts"));
    for (i = 0; i < newArray.length; i++) {
        if (JSON.parse(newArray[i]).numberEntered == CardId) {
            var forDelete = newArray[i];
            break;
        }
    }
    newArray.splice(newArray.indexOf(forDelete), 1);
    localStorage.setItem("contacts", JSON.stringify(newArray));
}

function search() {
    var searchValue = document.getElementById("searchButton").value.toUpperCase();
    let forSearch = JSON.parse(localStorage.getItem("contacts"));
    var searchArray = [];
    for (i = 0; i < forSearch.length; i++) {
        let userNameinArray = JSON.parse(forSearch[i]).userNameEntred;
        if (userNameinArray.includes(searchValue)) {
            searchArray.push((forSearch[i]));
        }
    }

    for (let i of idlist) {
        document.getElementById(i).remove();
    }
    idlist = [];

    for (i = 0; i < searchArray.length; i++) {
        let searchUsername = JSON.parse(searchArray[i]).userNameEntred
        let searchEmail = JSON.parse(searchArray[i]).emailEntered;
        let searchPhone = JSON.parse(searchArray[i]).numberEntered;
        creatcard(searchUsername.toUpperCase(), searchEmail, searchPhone);
    }
}

function sortingArray() {
    let sortSelect = document.getElementById("Sort")
    let selectedValue = sortSelect.options[sortSelect.selectedIndex].value

    sortSelect.style.opacity = "1";
    if (selectedValue == "sortBy") {
        sortSelect.style.opacity = "0.5";
    }
    if (selectedValue == "A-Z") {
        var forSortArray = []
        let SortArray = JSON.parse(localStorage.getItem("contacts"));
        for (let i = 0; i < SortArray.length; i++) {
            forSortArray.push(JSON.parse(SortArray[i]))
        }
        forSortArray.sort(function (a, b) {
            if (a.userNameEntred < b.userNameEntred) {
                return -1
            } else if (a.userNameEntred > b.userNameEntred) {
                return 1;
            } else {
                return 0;
            }
        })
        for (let i of idlist) {
            document.getElementById(i).remove();
        }
        idlist = [];
        for (i = 0; i < forSortArray.length; i++) {
            let sortedusername = (forSortArray[i]).userNameEntred
            let soredemail = (forSortArray[i]).emailEntered;
            let sortedPhone = (forSortArray[i]).numberEntered;
            creatcard(sortedusername, soredemail, sortedPhone);
        }
    } else if (selectedValue == "Z-A") {
        var forSortArray = []
        let SortArray = JSON.parse(localStorage.getItem("contacts"));
        for (let i = 0; i < SortArray.length; i++) {
            forSortArray.push(JSON.parse(SortArray[i]))
        }
        forSortArray.sort(function (a, b) {
            if (a.userNameEntred > b.userNameEntred) {
                return -1
            } else if (a.userNameEntred < b.userNameEntred) {
                return 1;
            } else {
                return 0;
            }
        })
        for (let i of idlist) {
            document.getElementById(i).remove();
        }
        idlist = [];
        for (i = 0; i < forSortArray.length; i++) {

            let sortedusername = (forSortArray[i]).userNameEntred
            let soredemail = (forSortArray[i]).emailEntered;
            let sortedPhone = (forSortArray[i]).numberEntered;
            creatcard(sortedusername, soredemail, sortedPhone);
        }
    } else if (selectedValue == "newestFirst") {
        for (let i of idlist) {
            document.getElementById(i).remove();
        }
        idlist = [];
        var detailsArray = [];
        detailsArray = JSON.parse(localStorage.getItem("contacts"))
        for (i = detailsArray.length - 1; i >= 0; i--) {
            let nameofuser = JSON.parse(detailsArray[i]).userNameEntred;
            let emailofuser = JSON.parse(detailsArray[i]).emailEntered;
            let numberofuser = JSON.parse(detailsArray[i]).numberEntered;
            creatcard(nameofuser, emailofuser, numberofuser)
        }
    } else if (selectedValue == "oldestFirst") {
        for (let i of idlist) {
            document.getElementById(i).remove();
        }
        idlist = [];
        displayHome();
    }
}

document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("card-container-id").style.display = "grid";
})