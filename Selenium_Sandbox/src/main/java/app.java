import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by bouchaan on 14-04-02.
 */
public class app {
    public static void main (String[] args) throws IOException {
        Parser parserUrl = new Parser();
        String pattern = "#trainingList div.item  > a.cta:first-of-type";
        parserUrl.url();
        Link links = new Link("http://crim.ca/fr/centre-de-formation-et-transfert/formations");

       System.out.println(links.getLink(pattern));
        ArrayList<String> listHtml = links.getLink(pattern);
    }
}
