function createTestData(): void {
    const libraries = getData("/api/libraries") as Array<Library>;
    if (libraries.length === 0) {
        alert("No Libraries");
        return;
    }

    //addBooks(libraries[1].Id);
    //addReaders(libraries[1].Id);
    checkOutBooks(libraries[1].Id);

}

//const serverURL = "https://favl.azurewebsites.net";
const serverURL = "http://localhost:51754";


class Book {
    Id: number;
    Title: string;
    AuthorFirst: string;
    AuthorMiddle: string;
    AuthorLast: string;
    Barcode: string;
    CheckedOutDate: string;
    DueDate: string;
    ReaderFirst: string;
    ReaderMiddle: string;
    ReaderLast: string;
    LibraryID: number;
}

class Library {
    Id: number;
    Name: string;
    Village: string;
    Country: string;
}

class Reader {
    Id: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    TotalCheckouts: number;
    Barcode: string;
    LibraryID: number;
}


function postData(path: string, data: Object): Object {
    const xhr = new XMLHttpRequest();

    //xhr.onreadystatechange = function () {
    //    if (xhr.readyState === XMLHttpRequest.DONE) {
    //        alert(xhr.responseText);
    //    }
    //}
    //xhr.onerror = () => alert("XHR Error");

    xhr.open("POST", serverURL + path, false);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
    alert(`Error Received: ${xhr.statusText}`);
    return null;
}

function getData(path: string): Object {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", serverURL + path, false);
    xhr.send();

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
    alert(`Error Received: ${xhr.statusText}`);
    return null;
}

function addBooks(libraryId: number): void {
    for (var i = 0; i < classics.length; i++) {
        var classic = classics[i];
        var author = classic.author.trim();
        var authorParts = author.split(" ");

        var book = new Book();
        book.Title = classic.title.trim();
        book.AuthorFirst = authorParts.length > 1 ? authorParts.splice(0, 1)[0].trim() : "";
        book.AuthorMiddle = authorParts.length > 1 ? authorParts.splice(0, 1)[0].trim() : "";
        book.AuthorLast = authorParts.join(" ");
        let iString = i.toString();
        let dateString = Date.now().toString();
        book.Barcode = iString + dateString.substr(dateString.length - (13 - iString.length), 13 - iString.length) + " (EAN_13)";
        book.LibraryID = libraryId;
        postData("/api/book/add", book);
    }
}

function addReaders(libraryId: number): void {
    for (var i = 0; i < 100; i++) {
        var reader = new Reader();
        let iString = i.toString();
        let dateString = Date.now().toString();
        reader.Barcode = iString + dateString.substr(dateString.length - (7 - iString.length), 7 - iString.length) + " (CODE_128)";
        reader.FirstName = firstNames[Math.floor(Math.random()*firstNames.length)];
        reader.MiddleName = firstNames[Math.floor(Math.random() * firstNames.length)].charAt(0);
        reader.LastName = surnames[Math.floor(Math.random() * surnames.length)]
        reader.LibraryID = libraryId;
        postData("/api/reader/add", reader);
    }
}

function checkOutBooks(libraryId: number): void {
    var readers = getData(`/api/readers/${libraryId}`) as Array<Reader>;
    var books = getData(`/api/books/${libraryId}`) as Array<Book>;

    for (var i = 0; i < 50; i++) {
        var reader = readers[Math.floor(Math.random() * readers.length)];
        var book = books[Math.floor(Math.random() * books.length)];

        getData(`/api/books/checkout/${book.Id}/${reader.Id}`);
    }
}

var classics = [
    { "title": "To Kill a Mockingbird", "author": "\nHarper Lee\n" },
    { "title": "Pride and Prejudice", "author": "\nJane Austen\n" },
    { "title": "Jane Eyre", "author": "\nCharlotte Brontë\n" }, { "title": "1984", "author": "\nGeorge Orwell\n" },
    { "title": "The Great Gatsby", "author": "\nF. Scott Fitzgerald\n" },
    { "title": "The Count of Monte Cristo", "author": "\nAlexandre Dumas\n" },
    { "title": "Animal Farm", "author": "\nGeorge Orwell\n" },
    { "title": "The Lord of the Rings (The Lord of the Rings, #1-3)", "author": "\nJ.R.R. Tolkien\n" },
    { "title": "Little Women (Little Women, #1)", "author": "\nLouisa May Alcott\n" },
    { "title": "The Hobbit", "author": "\nJ.R.R. Tolkien\n" },
    { "title": "The Picture of Dorian Gray", "author": "\nOscar Wilde\n" },
    { "title": "Hamlet", "author": "\nWilliam Shakespeare\n" },
    { "title": "Wuthering Heights", "author": "\nEmily Brontë\n" },
    { "title": "The Catcher in the Rye", "author": "\nJ.D. Salinger\n" },
    { "title": "Lord of the Flies", "author": "\nWilliam Golding\n" },
    { "title": "Crime and Punishment", "author": "\nFyodor Dostoyevsky\n" },
    { "title": "Frankenstein", "author": "\nMary Wollstonecraft Shelley\n" },
    { "title": "Sense and Sensibility", "author": "\nJane Austen\n" },
    { "title": "Romeo and Juliet", "author": "\nWilliam Shakespeare\n" },
    { "title": "Fahrenheit 451", "author": "\nRay Bradbury\n" }, { "title": "Dracula", "author": "\nBram Stoker\n" },
    { "title": "Great Expectations", "author": "\nCharles Dickens\n" },
    { "title": "Les Misérables", "author": "\nVictor Hugo\n" },
    { "title": "A Christmas Carol", "author": "\nCharles Dickens\n" },
    { "title": "The Diary of a Young Girl", "author": "\nAnne Frank\n" },
    { "title": "A Tale of Two Cities", "author": "\nCharles Dickens\n" },
    { "title": "The Adventures of Huckleberry Finn", "author": "\nMark Twain\n" },
    { "title": "Persuasion", "author": "\nJane Austen\n" },
    { "title": "Alice's Adventures in Wonderland & Through the Looking-Glass", "author": "\nLewis Carroll\n" },
    { "title": "The Secret Garden", "author": "\nFrances Hodgson Burnett\n" },
    { "title": "Gone with the Wind", "author": "\nMargaret Mitchell\n" },
    { "title": "Macbeth", "author": "\nWilliam Shakespeare\n" }, { "title": "Emma", "author": "\nJane Austen\n" },
    { "title": "The Grapes of Wrath", "author": "\nJohn Steinbeck\n" },
    { "title": "The Scarlet Letter", "author": "\nNathaniel Hawthorne\n" },
    { "title": "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)", "author": "\nJ.K. Rowling\n" },
    { "title": "Of Mice and Men", "author": "\nJohn Steinbeck\n" },
    { "title": "Anna Karenina", "author": "\nLeo Tolstoy\n" }, { "title": "The Odyssey", "author": "\nHomer\n" },
    { "title": "The Chronicles of Narnia (Chronicles of Narnia, #1-7)", "author": "\nC.S. Lewis\n" },
    { "title": "The Little Prince", "author": "\nAntoine de Saint-Exupéry (Author/Illustrator)\n" },
    { "title": "Brave New World", "author": "\nAldous Huxley\n" },
    { "title": "Catch-22", "author": "\nJoseph Heller\n" },
    { "title": "The Old Man and the Sea", "author": "\nErnest Hemingway\n" },
    { "title": "War and Peace", "author": "\nLeo Tolstoy\n" },
    { "title": "Anne of Green Gables (Anne of Green Gables, #1)", "author": "\nL.M. Montgomery\n" },
    { "title": "Don Quixote", "author": "\nMiguel de Cervantes\n" },
    { "title": "Lolita", "author": "\nVladimir Nabokov\n" },
    { "title": "The Three Musketeers", "author": "\nAlexandre Dumas\n" },
    { "title": "Slaughterhouse-Five", "author": "\nKurt Vonnegut\n" },
    { "title": "One Flew Over the Cuckoo's Nest", "author": "\nKen Kesey\n" },
    { "title": "Rebecca", "author": "\nDaphne du Maurier\n" },
    { "title": "Tess of the D'Urbervilles", "author": "\nThomas Hardy\n" },
    { "title": "A Midsummer Night's Dream", "author": "\nWilliam Shakespeare\n" },
    { "title": "The Importance of Being Earnest", "author": "\nOscar Wilde\n" },
    { "title": "The Adventures of Tom Sawyer", "author": "\nMark Twain\n" },
    { "title": "Mansfield Park", "author": "\nJane Austen\n" },
    { "title": "The Outsiders", "author": "\nS.E. Hinton (Goodreads Author)\n" },
    { "title": "The Iliad", "author": "\nHomer\n" },
    { "title": "Treasure Island", "author": "\nRobert Louis Stevenson\n" },
    { "title": "A Tree Grows in Brooklyn", "author": "\nBetty  Smith\n" },
    { "title": "Flowers for Algernon", "author": "\nDaniel Keyes\n" },
    { "title": "Moby-Dick or, The Whale", "author": "\nHerman Melville\n" },
    { "title": "The Brothers Karamazov", "author": "\nFyodor Dostoyevsky\n" },
    { "title": "All Quiet on the Western Front", "author": "\nErich Maria Remarque\n" },
    { "title": "The Good Earth (House of Earth, #1)", "author": "\nPearl S. Buck\n" },
    { "title": "Night", "author": "\nElie Wiesel\n" }, { "title": "Madame Bovary", "author": "\nGustave Flaubert\n" },
    { "title": "Watership Down (Watership Down #1)", "author": "\nRichard Adams\n" },
    { "title": "One Hundred Years of Solitude", "author": "\nGabriel García Márquez\n" },
    { "title": "The Divine Comedy", "author": "\nDante Alighieri\n" },
    { "title": "East of Eden", "author": "\nJohn Steinbeck\n" },
    { "title": "The Crucible", "author": "\nArthur Miller\n" },
    { "title": "Much Ado About Nothing", "author": "\nWilliam Shakespeare\n" },
    { "title": "Northanger Abbey", "author": "\nJane Austen\n" },
    { "title": "Memoirs of a Geisha", "author": "\nArthur Golden\n" },
    { "title": "Atlas Shrugged", "author": "\nAyn Rand\n" },
    { "title": "Sherlock Holmes: The Complete Novels and Stories, Volume I", "author": "\nArthur Conan Doyle\n" },
    { "title": "A Clockwork Orange", "author": "\nAnthony Burgess\n" },
    { "title": "Wuthering Heights, Agnès Grey & Villette", "author": "\nEmily Brontë\n" },
    { "title": "Uncle Tom's Cabin", "author": "\nHarriet Beecher Stowe\n" },
    { "title": "Heart of Darkness", "author": "\nJoseph Conrad\n" },
    { "title": "Holy Bible: King James Version", "author": "\nAnonymous\n" },
    { "title": "Twenty Thousand Leagues Under the Sea (Extraordinary Voyages, #6)", "author": "\nJules Verne\n" },
    { "title": "The Lion, the Witch, and the Wardrobe (Chronicles of Narnia, #1)", "author": "\nC.S. Lewis\n" },
    { "title": "Siddhartha", "author": "\nHermann Hesse\n" },
    {
        "title": "The Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy, #1)",
        "author": "\nDouglas Adams\n"
    }, { "title": "The Fall of the House of Usher and Other Tales", "author": "\nEdgar Allan Poe\n" },
    { "title": "Aesop's Fables", "author": "\nAesop\n" }, { "title": "Dune (Dune #1)", "author": "\nFrank Herbert\n" },
    { "title": "The Sound and the Fury", "author": "\nWilliam Faulkner\n" },
    { "title": "Bleak House", "author": "\nCharles Dickens\n" },
    { "title": "The Scarlet Pimpernel", "author": "\nEmmuska Orczy\n" },
    { "title": "The Awakening", "author": "\nKate Chopin\n" },
    { "title": "The Metamorphosis", "author": "\nFranz Kafka\n" },
    { "title": "The Canterbury Tales", "author": "\nGeoffrey Chaucer\n" },
    {
        "title": "The Metamorphosis, In the Penal Colony, and Other Stories: The Great Short Works of Franz Kafka",
        "author": "\nFranz Kafka\n"
    }, { "title": "The Kite Runner", "author": "\nKhaled Hosseini (Goodreads Author)\n" },
    { "title": "The Call of the Wild, White Fang and Other Stories", "author": "\nJack London\n" },
    { "title": "The Woman in White", "author": "\nWilkie Collins\n" },
    { "title": "The Godfather", "author": "\nMario Puzo\n" }, { "title": "Candide", "author": "\nVoltaire\n" },
    { "title": "Their Eyes Were Watching God", "author": "\nZora Neale Hurston\n" },
    { "title": "Charlotte's Web", "author": "\nE.B. White\n" },
    { "title": "The Bell Jar", "author": "\nSylvia Plath\n" },
    { "title": "Oliver Twist", "author": "\nCharles Dickens\n" },
    { "title": "Gulliver's Travels", "author": "\nJonathan Swift\n" },
    { "title": "The Wonderful Wizard of Oz (Oz, #1)", "author": "\nL. Frank Baum\n" },
    { "title": "The Stranger", "author": "\nAlbert Camus\n" },
    { "title": "David Copperfield", "author": "\nCharles Dickens\n" },
    { "title": "The Fellowship of the Ring (The Lord of the Rings, #1)", "author": "\nJ.R.R. Tolkien\n" },
    { "title": "The Jungle Books", "author": "\nRudyard Kipling\n" },
    { "title": "Alice in Wonderland", "author": "\nLewis Carroll\n" },
    { "title": "Journey to the Center of the Earth (Extraordinary Voyages, #3)", "author": "\nJules Verne\n" },
    { "title": "North and South", "author": "\nElizabeth Gaskell\n" },
    { "title": "Green Eggs and Ham", "author": "\nDr. Seuss\n" },
    { "title": "The Giver (The Giver, #1)", "author": "\nLois Lowry (Goodreads Author)\n" },
    { "title": "The Call of the Wild", "author": "\nJack London\n" },
    { "title": "Winnie-the-Pooh (Winnie-the-Pooh, #1)", "author": "\nA.A. Milne\n" },
    { "title": "Things Fall Apart (The African Trilogy, #1)", "author": "\nChinua Achebe\n" },
    { "title": "The Complete Grimm's Fairy Tales", "author": "\nJacob Grimm\n" },
    { "title": "Jude the Obscure", "author": "\nThomas Hardy\n" },
    { "title": "The Moonstone", "author": "\nWilkie Collins\n" },
    { "title": "The Time Machine", "author": "\nH.G. Wells\n" },
    { "title": "The Hunchback of Notre-Dame", "author": "\nVictor Hugo\n" },
    { "title": "The Jungle", "author": "\nUpton Sinclair\n" },
    { "title": "Middlemarch/Silas Marner/Amos Barton", "author": "\nGeorge Eliot\n" },
    { "title": "Leaves of Grass", "author": "\nWalt Whitman\n" },
    { "title": "Walden & Civil Disobedience", "author": "\nHenry David Thoreau\n" },
    { "title": "Vanity Fair", "author": "\nWilliam Makepeace Thackeray\n" },
    { "title": "The Chosen", "author": "\nChaim Potok\n" }, { "title": "Othello", "author": "\nWilliam Shakespeare\n" },
    { "title": "In Cold Blood", "author": "\nTruman Capote\n" },
    { "title": "A Wrinkle in Time (A Wrinkle in Time Quintet, #1)", "author": "\nMadeleine L'Engle\n" },
    { "title": "The Strange Case of Dr. Jekyll and Mr. Hyde", "author": "\nRobert Louis Stevenson\n" },
    { "title": "The Adventures of Sherlock Holmes (Sherlock Holmes, #3)", "author": "\nArthur Conan Doyle\n" },
    { "title": "The Age of Innocence", "author": "\nEdith Wharton\n" },
    { "title": "Mrs. Dalloway", "author": "\nVirginia Woolf\n" },
    { "title": "The Hound of the Baskervilles (Sherlock Holmes, #5)", "author": "\nArthur Conan Doyle\n" },
    { "title": "Robinson Crusoe", "author": "\nDaniel Defoe\n" }, { "title": "Beowulf", "author": "\nUnknown\n" },
    { "title": "A Little Princess", "author": "\nFrances Hodgson Burnett\n" },
    { "title": "The Return of the King (The Lord of the Rings, #3)", "author": "\nJ.R.R. Tolkien\n" },
    { "title": "Little House in the Big Woods (Little House, #1)", "author": "\nLaura Ingalls Wilder\n" },
    { "title": "Paradise Lost", "author": "\nJohn Milton\n" }, { "title": "Middlemarch", "author": "\nGeorge Eliot\n" },
    { "title": "Oedipus Rex  (The Theban Plays, #1)", "author": "\nSophocles\n" },
    { "title": "Where the Wild Things Are", "author": "\nMaurice Sendak\n" },
    { "title": "The Trial", "author": "\nFranz Kafka\n" }, { "title": "Black Beauty", "author": "\nAnna Sewell\n" },
    { "title": "Julius Caesar", "author": "\nWilliam Shakespeare\n" },
    { "title": "The Alchemist", "author": "\nPaulo Coelho (Goodreads Author)\n" },
    { "title": "A Room with a View", "author": "\nE.M. Forster\n" },
    { "title": "Invisible Man", "author": "\nRalph Ellison\n" },
    { "title": "The Phantom of the Opera", "author": "\nGaston Leroux\n" },
    { "title": "The Martian Chronicles", "author": "\nRay Bradbury\n" },
    { "title": "My Ántonia", "author": "\nWilla Cather\n" }, { "title": "The Fountainhead", "author": "\nAyn Rand\n" },
    { "title": "Around the World in Eighty Days (Extraordinary Voyages, #11)", "author": "\nJules Verne\n" },
    { "title": "The Taming of the Shrew", "author": "\nWilliam Shakespeare\n" },
    { "title": "The Color Purple", "author": "\nAlice Walker\n" },
    { "title": "Steppenwolf", "author": "\nHermann Hesse\n" },
    { "title": "A Separate Peace", "author": "\nJohn Knowles\n" },
    { "title": "Inferno (The Divine Comedy #1)", "author": "\nDante Alighieri\n" },
    { "title": "The Aeneid", "author": "\nVirgil\n" }, { "title": "The Plague", "author": "\nAlbert Camus\n" },
    { "title": "The Once and Future King (The Once and Future King #1-4)", "author": "\nT.H. White\n" },
    { "title": "The Handmaid's Tale", "author": "\nMargaret Atwood (Goodreads Author)\n" },
    { "title": "The Art of War", "author": "\nSun Tzu\n" }, { "title": "Ulysses", "author": "\nJames Joyce\n" },
    { "title": "A Streetcar Named Desire", "author": "\nTennessee Williams\n" },
    { "title": "The Tale of Peter Rabbit", "author": "\nBeatrix Potter\n" },
    { "title": "The Arabian Nights", "author": "\nAnonymous\n" },
    { "title": "Man's Search for Meaning", "author": "\nViktor E. Frankl\n" },
    { "title": "Shakespeare's Sonnets", "author": "\nWilliam Shakespeare\n" },
    { "title": "Murder on the Orient Express (Hercule Poirot, #10)", "author": "\nAgatha Christie\n" },
    { "title": "The Idiot", "author": "\nFyodor Dostoyevsky\n" },
    { "title": "Narrative of the Life of Frederick Douglass", "author": "\nFrederick Douglass\n" },
    { "title": "Faust: First Part", "author": "\nJohann Wolfgang von Goethe\n" },
    { "title": "King Lear", "author": "\nWilliam Shakespeare\n" }, { "title": "Ivanhoe", "author": "\nWalter Scott\n" },
    { "title": "Native Son", "author": "\nRichard Wright\n" },
    { "title": "Far from the Madding Crowd", "author": "\nThomas Hardy\n" },
    { "title": "Cry, the Beloved Country", "author": "\nAlan Paton\n" },
    { "title": "To the Lighthouse", "author": "\nVirginia Woolf\n" },
    { "title": "One Day in the Life of Ivan Denisovich", "author": "\nAleksandr Solzhenitsyn\n" },
    { "title": "Angle of Repose", "author": "\nWallace Stegner\n" },
    { "title": "The Tempest", "author": "\nWilliam Shakespeare\n" },
    { "title": "The Maltese Falcon", "author": "\nDashiell Hammett\n" },
    { "title": "The Phantom Tollbooth", "author": "\nNorton Juster\n" },
    { "title": "The House of Mirth", "author": "\nEdith Wharton\n" },
    { "title": "The Things They Carried", "author": "\nTim O'Brien\n" },
    { "title": "The Two Towers (The Lord of the Rings, #2)", "author": "\nJ.R.R. Tolkien\n" },
    { "title": "The Poisonwood Bible", "author": "\nBarbara Kingsolver\n" },
    { "title": "Richard III", "author": "\nWilliam Shakespeare\n" },
    { "title": "The Big Sleep", "author": "\nRaymond Chandler\n" },
    { "title": "The Rime of the Ancient Mariner", "author": "\nSamuel Taylor Coleridge\n" },
    { "title": "The Giving Tree", "author": "\nShel Silverstein\n" },
    { "title": "Crossing to Safety", "author": "\nWallace Stegner\n" },
    { "title": "Little Dorrit", "author": "\nCharles Dickens\n" },
    { "title": "Anthem", "author": "\nAyn Rand\n" },
    { "title": "The Autobiography of Malcolm X", "author": "\nMalcolm X\n" },
    { "title": "Tarzan of the Apes (Tarzan, #1)", "author": "\nEdgar Rice Burroughs\n" },
    { "title": "A Study in Scarlet (Sherlock Holmes, #1)", "author": "\nArthur Conan Doyle\n" },
    { "title": "Peter Pan", "author": "\nJ.M. Barrie\n" },
    { "title": "The Sorrows of Young Werther", "author": "\nJohann Wolfgang von Goethe\n" },
    { "title": "How Green Was My Valley", "author": "\nRichard Llewellyn\n" },
    { "title": "My Name Is Asher Lev", "author": "\nChaim Potok\n" },
    { "title": "The Little Mermaid", "author": "\nHans Christian Andersen\n" },
    { "title": "The Screwtape Letters", "author": "\nC.S. Lewis\n" },
    { "title": "Songs of Innocence and of Experience", "author": "\nWilliam Blake\n" },
    { "title": "Antigone (The Theban Plays, #3)", "author": "\nSophocles\n" },
    { "title": "Blindness", "author": "\nJosé Saramago\n" },
    { "title": "Charlie and the Chocolate Factory (Charlie Bucket, #1)", "author": "\nRoald Dahl\n" },
    { "title": "White Fang", "author": "\nJack London\n" },
    { "title": "The Pit and the Pendulum", "author": "\nEdgar Allan Poe\n" },
    { "title": "The Complete Fairy Tales", "author": "\nHans Christian Andersen\n" },
    { "title": "An American Tragedy", "author": "\nTheodore Dreiser\n" },
    { "title": "The Complete Poems", "author": "\nEmily Dickinson\n" },
    { "title": "Dubliners", "author": "\nJames Joyce\n" },
    { "title": "The Wind in the Willows", "author": "\nKenneth Grahame\n" },
    { "title": "Waiting for Godot", "author": "\nSamuel Beckett\n" },
    { "title": "The Unbearable Lightness of Being", "author": "\nMilan Kundera\n" },
    { "title": "Ethan Frome", "author": "\nEdith Wharton\n" },
    { "title": "Villette", "author": "\nCharlotte Brontë\n" },
    { "title": "Cat's Cradle", "author": "\nKurt Vonnegut\n" },
    { "title": "Cranford", "author": "\nElizabeth Gaskell\n" },
    { "title": "Perfume: The Story of a Murderer", "author": "\nPatrick Süskind\n" },
    { "title": "The Tenant of Wildfell Hall", "author": "\nAnne Brontë\n" },
    { "title": "The Prince and the Pauper", "author": "\nMark Twain\n" },
    { "title": "A Lesson Before Dying", "author": "\nErnest J. Gaines\n" },
    { "title": "The Portrait of a Lady", "author": "\nHenry James\n" },
    { "title": "The Stand", "author": "\nStephen King (Goodreads Author)\n" },
    { "title": "And Then There Were None", "author": "\nAgatha Christie\n" },
    { "title": "I, the Sun", "author": "\nJanet E. Morris (Goodreads Author)\n" },
    { "title": "The Merchant of Venice", "author": "\nWilliam Shakespeare\n" },
    { "title": "Cyrano de Bergerac", "author": "\nEdmond Rostand\n" },
    { "title": "Les Fleurs du Mal", "author": "\nCharles Baudelaire\n" },
    { "title": "Ender's Game (Ender's Saga, #1)", "author": "\nOrson Scott Card\n" },
    { "title": "The Complete Stories", "author": "\nFlannery O'Connor\n" },
    { "title": "Tuesdays with Morrie", "author": "\nMitch Albom (Goodreads Author)\n" },
    { "title": "2001: A Space Odyssey (Space Odyssey, #1)", "author": "\nArthur C. Clarke\n" },
    { "title": "The Sign of Four (Sherlock Holmes, #2)", "author": "\nArthur Conan Doyle\n" },
    { "title": "Where the Red Fern Grows", "author": "\nWilson Rawls\n" },
    { "title": "Doctor Zhivago", "author": "\nBoris Pasternak\n" },
    { "title": "The Sun Also Rises", "author": "\nErnest Hemingway\n" },
    { "title": "Foundation (Foundation #1)", "author": "\nIsaac Asimov\n" },
    { "title": "Just So Stories", "author": "\nRudyard Kipling\n" },
    { "title": "Tender Is the Night", "author": "\nF. Scott Fitzgerald\n" },
    { "title": "Fathers and Sons", "author": "\nIvan Turgenev\n" },
    { "title": "The Remains of the Day", "author": "\nKazuo Ishiguro\n" },
    { "title": "Harold and the Purple Crayon", "author": "\nCrockett Johnson\n" },
    { "title": "Song of Solomon", "author": "\nToni Morrison\n" },
    { "title": "King Solomon's Mines (Allan Quatermain, #1)", "author": "\nH. Rider Haggard\n" },
    { "title": "The Waste Land and Other Poems", "author": "\nT.S. Eliot\n" },
    { "title": "Metamorphoses", "author": "\nOvid\n" }, { "title": "Sister Carrie", "author": "\nTheodore Dreiser\n" },
    { "title": "I Capture the Castle", "author": "\nDodie Smith\n" },
    { "title": "Mary Poppins (Mary Poppins, #1)", "author": "\nP.L. Travers\n" },
    { "title": "The Return of Sherlock Holmes (Sherlock Holmes, #6)", "author": "\nArthur Conan Doyle\n" },
    {
        "title": "The Princess Bride", "author": "\nWilliam Goldman\n"
    }, { "title": "Franny and Zooey", "author": "\nJ.D. Salinger\n" },
    { "title": "Beloved", "author": "\nToni Morrison\n" }, { "title": "Doctor Faustus", "author": "\nThomas Mann\n" },
    { "title": "Père Goriot", "author": "\nHonoré de Balzac\n" },
    { "title": "Light in August", "author": "\nWilliam Faulkner\n" },
    { "title": "The Prophet", "author": "\nKahlil Gibran\n" },
    { "title": "Of Human Bondage", "author": "\nW. Somerset Maugham\n" },
    { "title": "Sir Gawain and the Green Knight", "author": "\nUnknown\n" },
    { "title": "The Red and the Black", "author": "\nStendhal\n" },
    { "title": "The Mill on the Floss", "author": "\nGeorge Eliot\n" },
    { "title": "The Heart is a Lonely Hunter", "author": "\nCarson McCullers\n" },
    { "title": "The Long Weekend", "author": "\nRoss Lennon\n" },
    { "title": "The Return of the Native", "author": "\nThomas Hardy\n" },
    { "title": "Utopia", "author": "\nThomas More\n" },
    { "title": "The Day of the Triffids", "author": "\nJohn Wyndham\n" },
    { "title": "The Power and the Glory", "author": "\nGraham Greene\n" },
    { "title": "Island of the Blue Dolphins (Island of the Blue Dolphins, #1)", "author": "\nScott O'Dell\n" },
    { "title": "Christy", "author": "\nCatherine Marshall\n" },
    { "title": "Wives and Daughters", "author": "\nElizabeth Gaskell\n" },
    { "title": "We", "author": "\nYevgeny Zamyatin\n" }, { "title": "Selected Poems", "author": "\nEmily Dickinson\n" },
    { "title": "Pet Sematary", "author": "\nStephen King (Goodreads Author)\n" },
    { "title": "Pygmalion", "author": "\nGeorge Bernard Shaw\n" },
    { "title": "The Virgin Suicides", "author": "\nJeffrey Eugenides\n" },
    { "title": "Roots: The Saga of an American Family", "author": "\nAlex Haley\n" },
    { "title": "A Farewell to Arms", "author": "\nErnest Hemingway\n" },
    { "title": "The Gift of the Magi", "author": "\nO. Henry\n" },
    { "title": "Breakfast at Tiffany's", "author": "\nTruman Capote\n" },
    { "title": "The Sneetches and Other Stories", "author": "\nDr. Seuss\n" },
    { "title": "The Raven", "author": "\nEdgar Allan Poe\n" },
    { "title": "The Iceman Cometh", "author": "\nEugene O'Neill\n" },
    { "title": "Os Lusiadas", "author": "\nLuís de Camões\n" }, { "title": "Lord Jim", "author": "\nJoseph Conrad\n" },
    { "title": "The Cider House Rules", "author": "\nJohn Irving (Goodreads Author)\n" },
    { "title": "Brideshead Revisited", "author": "\nEvelyn Waugh\n" },
    { "title": "The History of Tom Jones, a Foundling", "author": "\nHenry Fielding\n" },
    { "title": "Heidi", "author": "\nJohanna Spyri\n" },
    { "title": "Death in Venice and Other Tales", "author": "\nThomas Mann\n" }
];

var surnames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez",
    "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee",
    "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen", "Sanchez",
    "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell",
    "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres", "Parker", "Collins", "Edwards", "Stewart", "Flores",
    "Morris", "Nguyen", "Murphy", "Rivera", "Cook", "Rogers", "Morgan", "Peterson", "Cooper", "Reed", "Bailey", "Bell",
    "Gomez", "Kelly", "Howard", "Ward", "Cox", "Diaz", "Richardson", "Wood", "Watson", "Brooks", "Bennett", "Gray",
    "James", "Reyes", "Cruz", "Hughes", "Price", "Myers", "Long", "Foster", "Sanders", "Ross", "Morales", "Powell",
    "Sullivan", "Russell", "Ortiz", "Jenkins", "Gutierrez", "Perry", "Butler", "Barnes", "Fisher"
];

var firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Elizabeth", "William", "Linda", "David",
    "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Margaret", "Charles", "Sarah", "Christopher",
    "Karen", "Daniel", "Nancy", "Matthew", "Betty", "Anthony", "Dorothy", "Donald", "Lisa", "Mark", "Sandra", "Paul",
    "Ashley", "Steven", "Kimberly", "George", "Donna", "Kenneth", "Carol", "Andrew", "Michelle", "Joshua", "Emily",
    "Edward", "Helen", "Brian", "Amanda", "Kevin", "Melissa", "Ronald", "Deborah", "Timothy", "Stephanie", "Jason",
    "Laura", "Jeffrey", "Rebecca", "Ryan", "Sharon", "Gary", "Cynthia", "Jacob", "Kathleen", "Nicholas", "Shirley",
    "Eric", "Amy", "Stephen", "Anna", "Jonathan", "Angela", "Larry", "Ruth", "Scott", "Brenda", "Frank", "Pamela",
    "Justin", "Virginia", "Brandon", "Katherine", "Raymond", "Nicole", "Gregory", "Catherine", "Samuel", "Christine",
    "Benjamin", "Samantha", "Patrick", "Debra", "Jack", "Janet", "Alexander", "Carolyn", "Dennis", "Rachel", "Jerry",
    "Heather", "Tyler", "Maria", "Aaron", "Diane", "Henry", "Emma", "Douglas", "Julie", "Peter", "Joyce", "Jose",
    "Frances", "Adam", "Evelyn", "Zachary", "Joan", "Walter", "Christina", "Nathan", "Kelly", "Harold", "Martha",
    "Kyle", "Lauren", "Carl", "Victoria", "Arthur", "Judith", "Gerald", "Cheryl", "Roger", "Megan", "Keith", "Alice",
    "Jeremy", "Ann", "Lawrence", "Jean", "Terry", "Doris", "Sean", "Andrea", "Albert", "Marie", "Joe", "Kathryn",
    "Christian", "Jacqueline", "Austin", "Gloria", "Willie", "Teresa", "Jesse", "Hannah", "Ethan", "Sara", "Billy",
    "Janice", "Bruce", "Julia", "Bryan", "Olivia", "Ralph", "Grace", "Roy", "Rose", "Jordan", "Theresa", "Eugene",
    "Judy", "Wayne", "Beverly", "Louis", "Denise", "Dylan", "Marilyn", "Alan", "Amber", "Juan", "Danielle", "Noah",
    "Brittany", "Russell", "Madison", "Harry", "Diana", "Randy", "Jane", "Philip", "Lori", "Vincent", "Mildred",
    "Gabriel", "Tiffany", "Bobby", "Natalie", "Johnny", "Abigail", "Howard", "Kathy"
];