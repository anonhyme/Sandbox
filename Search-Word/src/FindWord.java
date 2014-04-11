/**
 * Created by bouchaan on 14-03-19.
 */
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FindWord {
    static File[] fileList;

    static void search(String path, String word) throws IOException
    {
        int pointer = 0;
        File file = new File(path);
        fileList = file.listFiles();
        //		fileList[x].getName();
        Pattern p = Pattern.compile(word);
        for(File doc : fileList)
        {
            if(doc.isFile())
            {

                searchInFile(doc, p);


            }
//			else if(doc.isFile())
//			{
//
//			}
        }


    }

    static void searchInFile(File doc, Pattern p) throws IOException
    {

        int lineNumber = 0;
        BufferedReader buff = new BufferedReader(new InputStreamReader(new FileInputStream(doc)));
        String line;
        while( (line = buff.readLine())!= null )
        {
            lineNumber++;
            Matcher match = p.matcher(line);
            while(match.find()){
                System.out.println("File name: " + doc);
                System.out.println("Line number: " + lineNumber);
                System.out.println("Position : " + match.start());
            }

        }

        buff.close();


    }

}
