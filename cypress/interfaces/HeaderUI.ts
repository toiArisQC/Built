export class HeaderUI{
    public static DYNAMIC_BUTTON_ON_HEADER_BY_DATA_TESTID (dataTestID: string) : string{
        return `[data-testid='${dataTestID}']`
    }
    public static DYNAMIC_BUTTON_ON_DIALOG_BY_CONTAINS_TEXT (containsText: string) : string{
        return `xpath=//button[contains(text(), '${containsText}')]`
    }
}