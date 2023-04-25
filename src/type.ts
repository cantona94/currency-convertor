export interface ICurrency {
    value: number;
    currency: string;
    onChangeCurrency: (value: string) => void;
    onChangeValue: (value: number) => void;
}