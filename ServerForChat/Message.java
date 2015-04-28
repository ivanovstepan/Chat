import org.json.simple.JSONAware;
import org.json.simple.JSONObject;

public class Message implements JSONAware {

    private String nameUser;
    private int id;
    private String text;
    private boolean deleted = false;
    private boolean changed = false;
    private String requst;

    public Message() {
        nameUser = "none";
        text = "";
        id = -1;
    }
    public Message(String text, String nameUser) {
        this.nameUser = nameUser;
        this.text = text;
        id = -1;
    }
    public Message(int id, String nameUser, String message) {
        this.id = id;
        this.nameUser = nameUser;
        this.text = message;
    }
    public void setRequst(String requst) {
        this.requst = requst;
    }
    public void setMessage(String message) {
        this.text = message;
    }
    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }
    public void setID(int id) {
        this.id = id;
    }
    public void setDelete(boolean deleted) {
        this.deleted = deleted;
    }
    public void setChange(boolean changed) {
        this.changed = changed;
    }
    public void setText(String text) {
        this.text = text;
    }
    public String getRequst() {
        return requst;
    }
    public String getNameUser() {
        return nameUser;
    }
    public int getID() {
        return id;
    }
    public String getText() {
        return text;
    }
    public boolean isDelete() {
        return deleted;
    }
    public boolean getChange() {
        return changed;
    }
    @Override
    public String toJSONString() {
        JSONObject obj = new JSONObject();
        obj.put("user", nameUser);
        obj.put("text", text);
        obj.put("id", id);
        obj.put("requst", requst);
        return obj.toString();
    }

    public void deleteMessage() {
        if(deleted != true) {
            this.text = "message has been deleted.";
            this.setDelete(true);
        }
    }
    public static Message parseInfoMessage(JSONObject obj) {
        Message info = new Message();

        info.setNameUser((String)obj.get("user"));
        info.setMessage((String)obj.get("text"));
        if(obj.get("id") != null) {
            info.setID(Integer.parseInt(obj.get("id").toString()));
        }
        return info;
    }


    @Override
    public String toString() {
        return nameUser+" : "+text;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Message other = (Message) obj;
        if (id != other.id)
            return false;

        return true;
    }
    @Override
    public int hashCode() {
        return 1*id+2*text.hashCode()+3*nameUser.hashCode();
    }
}