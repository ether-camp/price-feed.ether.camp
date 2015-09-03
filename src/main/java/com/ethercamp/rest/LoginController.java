package com.ethercamp.rest;


import com.ethercamp.model.LoginForm;
import com.ethercamp.model.ProjectMemberDetails;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
public class LoginController {


    @RequestMapping(value = "/login" , consumes= APPLICATION_JSON_VALUE)
    @ResponseBody
    public ProjectMemberDetails login(@RequestBody LoginForm loginForm){

        ProjectMemberDetails projectMemberDetails =
            projectForUserName(loginForm.getUser().toLowerCase());

        return projectMemberDetails;
    }


    public ProjectMemberDetails projectForUserName(String name){
        RestTemplate restTemplate = new RestTemplate();
        String rpcEnd = String.format("http://auth.ether.camp/all-project-members");

        HttpHeaders headers = new HttpHeaders();
        HttpEntity entity = new HttpEntity(headers);
        ResponseEntity<ProjectMemberDetails[]> response = null;

        try {
            response = restTemplate.exchange(rpcEnd, HttpMethod.GET, entity, ProjectMemberDetails[].class);
        } catch (HttpClientErrorException ex)   {}

        ProjectMemberDetails[] projectMemberDetailses = response.getBody();

        for (ProjectMemberDetails projectMemberDetails : projectMemberDetailses){
            if (projectMemberDetails.getUser().toLowerCase().equals(name))
                return projectMemberDetails;
        }

        return null;
    }


}
