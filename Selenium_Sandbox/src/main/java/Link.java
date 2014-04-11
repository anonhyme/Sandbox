import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by bouchaan on 14-04-09.
 */
public class Link {
    String url;

    Link (String url) {
        this.url = url;
    }

    public ArrayList<String> getLink (String pattern) {
        Document doc;
        ArrayList<String> links = null;
        Elements sections = null;
        try {
            doc = Jsoup.connect(url).get();
            links = new ArrayList<String>();
            Elements res = doc.select(pattern);
            //System.out.println(res);
            for (Element element : res) {
                links.add(url + element.attr("href"));
            }
        } catch (IOException e) {
            System.out.println("Url not found. Please check the url and retry");
            e.printStackTrace();
        }

        return links;
    }
}
