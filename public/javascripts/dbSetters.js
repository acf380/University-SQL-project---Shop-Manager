var connection = require('./database');
let getError = require('./errorHandler.js')

function getComplaints(res, req, next) {
    let sql = `SELECT R.Reklamacje_ID, R.Zamówienia_Zamówienie_ID, S.NAZWA_STANU 
    FROM reklamacje R
    LEFT OUTER JOIN ZAMÓWIENIA Z ON Z.ZAMÓWIENIE_ID=R.ZAMÓWIENIA_ZAMÓWIENIE_ID
    LEFT OUTER JOIN STANY S ON R.STANY_STAN_ID=S.STAN_ID`;

    connection.query(sql, function(err1, rows1){
        function getStates(res, req, rows1) {
            let sql2 = `SELECT NAZWA_STANU FROM STANY`;
            connection.query(sql2, function (err2, rows2) {
                if (err2) {
                    res.render('complaints', { page_title: "error2", warehouse: '', message: getError.getNiceError(err2.message)});
                }
                else {
                    const mess = req.flash('message');
                    if (mess.length == 0) res.render('complaints', { page_title: "succes12", warehouse: rows1, message: "", states: rows2 });
                    else res.render('complaints', { page_title: "succes12", warehouse: rows1, message: mess[0], states: rows2 });
                }
            });
        }
        if(err1){
            res.render('complaints', {page_title:"error1", warehouse: '', message: getError.getNiceError(err1.message)});   
            return;
        } 
        getStates(res, req, rows1);
    });
}

function getCarriers(res, req, next) {
    let sql = `SELECT PRZEWOŹNIK_ID, NAZWA_PRZEWOŹNIKA FROM PRZEWOŹNIK`;

    connection.query(sql, function(err, rows){
        if(err){
            res.render('carriers', {page_title:"error", warehouse: '', message: getError.getNiceError(err.message)});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('carriers', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('carriers', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}


function getClients(res, req, next) {
    let sql = `SELECT KLIENT_ID, IMIĘ, NAZWISKO, LOGIN, HASŁO FROM KLIENT`;

    connection.query(sql, function(err, rows){
        if(err){
            res.render('clients', {page_title:"error", warehouse: '', message: getError.getNiceError(err.message)});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('clients', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('clients', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}


function getStates(res, req, next) {
    let sql = `SELECT STAN_ID, NAZWA_STANU FROM STANY`;

    connection.query(sql, function(err, rows){
        if(err){
            res.render('states', {page_title:"error", warehouse: '', message: getError.getNiceError(err.message)});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('states', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('states', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}


function getReturns(res, req, next) {
    let sql = `SELECT Z.ZWROTY_ID, Z.ZAMÓWIENIA_ZAMÓWIENIE_ID, Z.PRODUKT_PRODUKT_ID, S.NAZWA_STANU 
    FROM ZWROTY Z
    LEFT OUTER JOIN STANY S ON Z.STANY_STAN_ID=S.STAN_ID`;

    connection.query(sql, function(err1, rows1){
        function getStates(res, req, rows1) {
            let sql2 = `SELECT NAZWA_STANU FROM STANY`;
            connection.query(sql2, function (err2, rows2) {
                if (err2) {
                    res.render('returns', { page_title: "error2", warehouse: '', message: getError.getNiceError(err2.message)});
                }
                else {
                    const mess = req.flash('message');
                    if (mess.length == 0) res.render('returns', { page_title: "succes12", warehouse: rows1, message: "", states: rows2 });
                    else res.render('returns', { page_title: "succes12", warehouse: rows1, message: mess[0], states: rows2 });
                }
            });
        }
        if(err1){ 
            res.render('complaints', {page_title:"error1", warehouse: '', message: getError.getNiceError(err1.message)});   
            return;
        } 
        getStates(res, req, rows1);
    });
}


function getOrdersContents(res, req, next) {
    var sql;
    let ord = req.flash('order');
    if (ord.length == 0) sql = `SELECT ZAWARTOŚĆ_ZAMÓWIEŃ_ID, ZAMÓWIENIA_ZAMÓWIENIE_ID, PRODUKT_PRODUKT_ID, ILOŚĆ FROM ZAWARTOŚĆ_ZAMÓWIEŃ`;
    else sql = `SELECT ZAWARTOŚĆ_ZAMÓWIEŃ_ID, ZAMÓWIENIA_ZAMÓWIENIE_ID, PRODUKT_PRODUKT_ID, ILOŚĆ FROM ZAWARTOŚĆ_ZAMÓWIEŃ ${ord[0]}`;


    connection.query(sql, function(err, rows){
        if(err){
            res.render('ordersContents', {page_title:"error", warehouse: '', message: getError.getNiceError(err.message)});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('ordersContents', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('ordersContents', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}



function getOrders(res, req, next) {
    let sql1 = `SELECT Z.ZAMÓWIENIE_ID, Z.DATA_ZAMÓWIENIA, S.NAZWA_STANU, P.NAZWA_PRZEWOŹNIKA, K.IMIĘ, K.NAZWISKO
    FROM ZAMÓWIENIA Z 
    LEFT OUTER JOIN STANY S ON Z.STANY_STAN_ID=S.STAN_ID
    LEFT OUTER JOIN PRZEWOŹNIK P ON Z.PRZEWOŹNIK_PRZEWOŹNIK_ID=P.PRZEWOŹNIK_ID
    LEFT OUTER JOIN KLIENT K ON Z.KLIENT_KLIENT_ID=K.KLIENT_ID`;
    connection.query(sql1, function (err1, rows1) {
        function getCarriers(res, req, rows1) {
            let sql2 = `SELECT NAZWA_PRZEWOŹNIKA FROM PRZEWOŹNIK`;
            connection.query(sql2, function (err2, rows2) {
                function getStates(res, req, rows2, rows1) {
                    let sql3 = `SELECT NAZWA_STANU FROM STANY`;
                    connection.query(sql3, function (err3, rows3) {
                        if (err3) {
                            res.render('orders', { page_title: "error3", warehouse: '', message: getError.getNiceError(err3.message)});
                        }
                        else {
                            var mess = req.flash('message');
                            if (mess.length == 0) mess = "";
                            else mess = mess[0];
                            var summ = req.flash('summary');
                            if (summ.length == 0) summ = "";
                            else summ = summ[0];
                            res.render('orders', { page_title: "succes12", warehouse: rows1, message: mess, carriers: rows2, states: rows3, summary: summ });
                        }
                    });
                }
                if (err2) {
                    res.render('orders', { page_title: "error2", warehouse: '', message: getError.getNiceError(err2.message)});
                }
                getStates(res, req, rows2, rows1);
            });
        }
        if (err1) {
            res.render('orders', { page_title: "error1", warehouse: '', message: getError.getNiceError(err1.message) });
            return;
        }
        getCarriers(res, req, rows1);
    });
}



function getCategories(res, req, next) {
    let sql = `SELECT KATEGORIA_ID, KATEGORIA FROM mydb.KATEGORIE`;

    connection.query(sql, function(err, rows){
        if(err){
            res.render('categories', {page_title:"error", warehouse: '', message: getError.getNiceError(err.message)});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('categories', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('categories', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}



function getProducts(res, req, next) {
    var search = req.flash('search');
    if (search.length == 0) search = "";
    else search = search[0];

    let sql = `SELECT P.PRODUKT_ID, K.KATEGORIA, P.MARKA, P.MODEL, P.CENA, P.PROCESOR, P.MOC, P.WAGA, P.PRZEKĄTNA_EKRANU, P.ROZDZIELCZOŚĆ 
    FROM mydb.PRODUKT P LEFT OUTER JOIN mydb.KATEGORIE K ON P.KATEGORIE_KATEGORIA_ID = K.KATEGORIA_ID ${search}`;

    console.log(sql);

    connection.query(sql, function(err1, mpRows){
        function getCategory(res, req, mpRows) {
            let sql = `SELECT KATEGORIA FROM KATEGORIE`;
            connection.query(sql, function(err2, kRows){
                if(err2) {
                    res.render('products', {page_title:"error2", warehouse: '', categories: '', message: getError.getNiceError(err2.message)});
                }    
                else {
                    const mess = req.flash('message');
                    if (mess.length == 0) res.render('products', {page_title:"succes12", warehouse: mpRows, message: "", categories: kRows});
                    else res.render('products', {page_title:"succes12", warehouse: mpRows, message: mess[0], categories: kRows});
                }  
            });
        }
        if(err1){
            res.render('products', {page_title:"error1", warehouse: '', categories: '', message: getError.getNiceError(err1.message)});   
            return;
        }
        getCategory(res, req, mpRows);
    });
}



function getWarehouse(res, req, next) {
    let sql = `SELECT P.PRODUKT_ID, M.ILOŚĆ, K.KATEGORIA, P.MARKA, P.MODEL, P.CENA, P.WAGA
    FROM mydb.magazyn M JOIN mydb.PRODUKT P ON P.PRODUKT_ID = M.PRODUKT_PRODUKT_ID
    LEFT OUTER JOIN mydb.KATEGORIE K ON P.KATEGORIE_KATEGORIA_ID = K.KATEGORIA_ID`;

    connection.query(sql, function(err, rows){
        if(err){
            res.render('warehouse', {page_title:"error", warehouse: '', message: getError.getNiceError(err.message)});   
            return;
        } else {
            var mess = req.flash('message');
            if (mess.length == 0) mess = "";
            else mess = mess[0];
            var summ = req.flash('sumAll');
            if (summ.length == 0) summ = "";
            console.log(summ, "wsad", mess)
            res.render('warehouse', {page_title:"succes", warehouse: rows, message: mess, sumAll: summ});
        }
    });
}

module.exports = {getWarehouse, getProducts, getCategories, getOrders, getOrdersContents, getComplaints, getReturns, getCarriers, getClients, getStates}