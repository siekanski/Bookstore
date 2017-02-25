
$(document).ready(function () {

    var newBookForm = $('#createform');

    var loadAllBooks = function () {

        $.ajax({
            url: "http://localhost/Bookstore/Bookstore/api/books.php",
            method: "GET",
            dataType: "JSON"
        })
                //Wczytanie wszystkich książek

                .done(function (booksTable) {
                    console.log("DONE");
                    var booksDiv = $('#books');
                    booksDiv.empty();
                    for (var i = 0; i < booksTable.length; i++) {
                        var newDiv = $('<div>');
                        var infoDiv = $("<div class='infoDiv'>");
                        newDiv.attr("data-id", booksTable[i].id);
                        newDiv.addClass('single-book');
                        newDiv.html("<div class='book-name'>" + booksTable[i].name + "</div>");
                        newDiv.append($("<button class='btn btn-primary showButton'><span class='glyphicon glyphicon-book'></span> Show</button>"));
                        newDiv.append($("<button class='btn btn-danger delButton'><span class='glyphicon glyphicon-remove'></span> Delete</button>"));
                        newDiv.appendTo(booksDiv);
                        infoDiv.appendTo(booksDiv);
                    }

                    //Wczytywanie informacji o konkretnej książce po kliknięciu w button "show"
                    var show = $('.showButton');
                    show.on('click', function (e) {

                        var info = $(this).parent().next();
                        var id = $(this).parent().attr('data-id');

                        if (!info.hasClass('visible') && !info.text()) {
                            $.ajax({
                                url: "http://localhost/Bookstore/Bookstore/api/books.php?id=" + id,
                                method: "GET",
                                dataType: "JSON"
                            })
                                    .done(function (book) {
                                        info.html("<p class='book-description'>" + book.description + "</p>" + "<p class='book-author'>Author:" + book.author + "</p>");
                                        var bookName = book.name;
                                        var bookDescription = book.description;
                                        var bookAuthor = book.author;

                                        var form = $('<h3>Edit</h3><form class="updateForm">' +
                                                '<div class="form-group"><label for="nameInput">Name</label><input type="text" id="nameInput" class="form-control" placeholder="" value=""></div>' +
                                                '<div class="form-group"><label for="descriptionInput">Description</label><input type="text" class="form-control" id="descriptionInput" placeholder=""></div>' +
                                                '<div class="form-group"><label for="authorInput">Author</label><input type="text" class="form-control" id="authorInput" placeholder=""></div>' +
                                                '<button class="btn btn-success updateButton">Update</button></form>');

                                        form.appendTo(info);
                                        info.addClass('visible');

                                        //Wypełnienie formularza danymi do edycji
                                        info.children('form').children().children('#nameInput').attr('value', bookName);
                                        info.children('form').children().children('#descriptionInput').attr('value', bookDescription);
                                        info.children('form').children().children('#authorInput').attr('value', bookAuthor);

                                        //Pobranie danych z formularza do edycji
                                        var updateFormButton = $('.updateButton');
                                        updateFormButton.on('click', function (e) {

                                            e.preventDefault();
                                            var nameUpdate = $(this).prev().prev().prev().children('input').val();
                                            var descriptionUpdate = $(this).prev().prev().children('input').val();
                                            var authorUpdate = $(this).prev().children('input').val();

                                            if (nameUpdate && descriptionUpdate && authorUpdate) {
                                                $.ajax({
                                                    url: "http://localhost/Bookstore/Bookstore/api/books.php",
                                                    method: "PUT",
                                                    data: "name=" + nameUpdate + "&description=" + descriptionUpdate + "&author=" + authorUpdate + "&id=" + id
                                                })
                                                        .done(function (data) {
                                                            //Przeładowanie listy książek po edycji
                                                            loadAllBooks();
                                                        })
                                            }
                                        })
                                    })
                        } else if (info.hasClass('visible')) {
                            info.removeClass('visible');
                        } else if (!info.hasClass('visible') && info.text()) {
                            info.addClass('visible');
                        }
                    });

                    //Usuwanie książki z bazy danych po kliknięciu w button "delete"
                    var deleteButtons = $('.delButton');
                    deleteButtons.on('click', function (e) {

                        var idToDelete = $(this).parent().attr('data-id');

                        $.ajax({
                            url: "http://localhost/Bookstore/Bookstore/api/books.php",
                            method: "DELETE",
                            data: "id=" + idToDelete
                        })
                                .done(function (response) {
                                    console.log("Jupi");
                                    //Przeładowanie listy książek po usunięciu książki
                                    loadAllBooks();
                                });
                    });
                })
    };

    //Pobieranie danych z formularza dodawania nowej ksiązki i zapisanie jej do bazy danych
    newBookForm.on('submit', function (e) {
        e.preventDefault();

        var nameInput = $('#nameInput');
        var descriptionInput = $('#descriptionInput');
        var authorInput = $('#authorInput');

        var name = nameInput.val();
        var description = descriptionInput.val();
        var author = authorInput.val();

        if (name && description && author) {

            $.ajax({
                url: "http://localhost/Bookstore/Bookstore/api/books.php",
                method: "POST",
                data: "name=" + name + "&description=" + description + "&author=" + author
            })
                    .done(function (data) {
                        console.log("DONE");
                        //Wyczyszczenie pól formularza po dodaniu książki
                        nameInput.val("");
                        descriptionInput.val("");
                        authorInput.val("");

                        //Przeładowanie listy książek po dodaniu nowej
                        loadAllBooks();
                    })
        }
    });

    loadAllBooks();

});


