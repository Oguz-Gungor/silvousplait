import { TSBeam } from "./TSBeam";


@TSBeam
export class Observer{
    //Observer implementation will be added later, for time being it is being used for only test purposes
    public count = 3;

    public addCounter(){
        this.count++;
    }

}