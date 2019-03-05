package springapp.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import springapp.domain.Client;
import springapp.service.ClientService;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ClientControllerTest {

    static List<Client> clients = new ArrayList();
    static  {
        clients.add(new Client(1, "John Doe", "555-555-5555", "1234 main street"));
        clients.add(new Client(2, "Jane Smith", "555-123-1234", "9876 country road"));

    }

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ClientService clientService;

    @Test
    @WithMockUser(value = "test", password = "pass", authorities = {"LIST_CLIENTS"})
    public void exampleTest() throws Exception {
        given(clientService.getClients()).willReturn(clients);
        MvcResult result = this.mvc.perform(get("/clients"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_HTML))
                .andReturn();

        String content = result.getResponse().getContentAsString();
        Document doc = Jsoup.parse(content);
        assertThat(content, doc.select("a[href='/clients/1']").text(), is("1"));
        assertThat(content, doc.select("a[href='/clients/2']").text(), is("2"));
    }

}
