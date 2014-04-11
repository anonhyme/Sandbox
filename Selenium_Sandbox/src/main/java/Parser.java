import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Entities;

import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.HashMap;

/**
 * Created by bouchaan on 14-04-02.
 */
public class Parser {

    String title = "div#centerCFT.container div.breadcrumbs span";

    public void url () throws IOException {
        //"D:\CRIM\Workspace\Selenium_Sandbox\crim.html"
        //http://crim.ca/fr/centre-de-formation-et-transfert/formations/developper-avec-c-intermediaire
        String url = "http://crim.ca/fr/centre-de-formation-et-transfert/formations/developper-avec-c-intermediaire";
        //URL url = new URL("http://fr.openclassrooms.com/");
        //Document doc = Jsoup.parse(url, 3000);
        Document doc = Jsoup.connect(url).get();
        Document.OutputSettings settings = new Document.OutputSettings();
        settings.prettyPrint(false);
        doc.outputSettings().escapeMode(Entities.EscapeMode.xhtml);
        printToFile(doc);
        //System.out.println(doc.html());

        //docFromUrl = Jsoup.parse(input, "UTF-8");
        //System.out.println(docFromUrl);
    }

    void printToFile (Object element) {
        try {
            String outputName = app.class.getSimpleName();
            FileWriter file = new FileWriter("D:/" + outputName + ".txt");
            file.write(element.toString());
            file.flush();
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
