package H51610;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by Evil on 16/8/30.
 */
public class PostMessage extends HttpServlet {
    private static HashMap<String,String> _message=new HashMap<String,String>();
    protected synchronized void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("t")!=null) {
            final String _t = request.getParameter("t");
            final String _u = request.getParameter("u");
            final String _m = request.getParameter("m");
            _message.put(_t, _u + ":" + _m);
        }
        Iterator<Map.Entry<String,String>> _iterator=_message.entrySet().iterator();
        Map.Entry<String,String> _entry;
        String _data="callBack({";
        while(_iterator.hasNext()){
            _entry=_iterator.next();
            _data+="\""+_entry.getKey()+"\":\""+_entry.getValue()+"\",";
        }
        _data=_data.substring(0,_data.lastIndexOf(","));
        _data+="})";
        response.getWriter().print(_data);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //doPost(request, response);
    }
}
