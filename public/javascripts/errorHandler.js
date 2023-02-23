function getNiceError(err) {
    ret = String(err);
    if (err.includes("ER_NO_REFERENCED_ROW_2")) ret = "BŁĄD: PRÓBA WSTAWIENIA NIEISTNIEJĄCEJ WARTOŚCI!";
    else if(err.includes("ER_ROW_IS_REFERENCED_2")) ret = "BŁĄD: REKORD UŻYWANY W INNEJ TABELI!"
    else if (err.includes("You have an error in your SQL syntax")) ret = "BŁĄD: PODANO NIEPRAWIDŁOWE WARTOŚCI KOMÓREK!";
    else if(err.includes("Duplicate entry")) ret = "BŁĄD: REKORD DUPLIKUJE KLUCZOWE WARTOŚCI INNEGO REKORDU!";
    else if (err.includes("ER_NO_DEFAULT_FOR_FIELD")) ret = "BŁĄD: NIE PODANO WARTOŚCI DLA OBOWIĄZKOWEJ KOLUMNY!";
    else if (err.includes("ER_BAD_FIELD_ERROR")) ret = "BŁĄD: PODANO NIEPRAWIDŁOWE WARTOŚCI KOMÓREK!";
    else if (err.includes("Incorrect date value")) ret = "BŁĄD: NIEPRAWIDŁOWA DATA!";
    return ret;
}

module.exports = {getNiceError};
