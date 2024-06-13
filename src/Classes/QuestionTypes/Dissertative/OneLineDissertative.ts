import { QuestionType } from "src/Enums/QuestionTypes";
import Dissertative from "./Dissertative";

export default class OneLineDissertative extends Dissertative {
    questionType: QuestionType;
    characterLimit: number;
}