import * as yup from "yup";

export const employeeFormSchema = yup.object().shape({
    id: yup.number(),
    name: yup.string()
        .required("Укажите Имя и Фамилию")
        .matches(/^[A-ЯЁ][а-яё]+\s[A-ЯЁ][а-яё]+$/, "Пример: Виктор Цой"),
    isArchive: yup.boolean(),
    role: yup.string()
        .required("Укажите должность"),
    phone: yup.string()
        .required("Укажите телефон")
        .matches(/^(\+7)?[\s\-]?\(?[1-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm, "Ведите телефон в формате: +7(###) ###-####"),
    birthday: yup.string()
        .required("Укажите дату")
        .matches(/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.(\d{4})\s*$/g, "Введите дату в формате: dd.MM.yyyy")
});

export type EmployeeFormDataType = yup.InferType<typeof employeeFormSchema>;
