package proiectLicenta.clase;

import java.util.ArrayList;
import java.util.List;

public class Intrebare {
    private String textIntrebare; 
    private String raspunsCorect;
    private List<String> raspunsuri = new ArrayList<>(); 

    public Intrebare() {
    }

    public Intrebare(String textIntrebare, String raspunsCorect, List<String> raspunsuri) {
        this.textIntrebare = textIntrebare;
        this.raspunsCorect = raspunsCorect;
        this.raspunsuri = raspunsuri;
    }

    public String getTextIntrebare() {
        return textIntrebare;
    }

    public void setTextIntrebare(String textIntrebare) {
        this.textIntrebare = textIntrebare;
    }

    public String getRaspunsCorect() {
        return raspunsCorect;
    }

    public void setRaspunsCorect(String raspunsCorect) {
        this.raspunsCorect = raspunsCorect;
    }

    public List<String> getRaspunsuri() {
        return raspunsuri;
    }

    public void setRaspunsuri(List<String> raspunsuri) {
        this.raspunsuri = raspunsuri;
    }

}
