import { Link, Spacer, Text, Input, Navbar } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { AcmeLogo } from "./AcmeLogo.js";
import { SearchIcon } from "./SearchIcon.js";
import {useRouter} from 'next/router'



const CustomNavBar = () => {
   
    const id= Math.floor(Math.random()*100+1);
    const [searchItems, setSearchItem] = useState('')
    const router = useRouter()
    
    const onSearchTerms = () => {
      if(searchItems.trim().length === 0) return;
      router.push(`/search/${searchItems}`)
    }
    return (
      <Navbar  isBordered maxWidth = 'fluid' variant = 'sticky'>
      
      <Navbar.Brand>
     
      <Image alt="logoapp" width={70} height={70} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }/>
      <NextLink href="/" passHref>
        <Link>
          <Text color="white" h2>
            
            P
          </Text>
          <Text color="white" h3>
            okedex
          </Text>
        </Link>
      </NextLink>
      </Navbar.Brand>
      <Spacer css={{flex:1}}/>

      


      <Navbar isBordered variant="sticky">
        <Navbar.Brand css={{ mr: "$4" }}>
          <AcmeLogo />
          <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
            ACME
          </Text>
          <Navbar.Content hideIn="xs" variant="highlight">
            <Navbar.Link isActive href="#">
              Dashboard
            </Navbar.Link>
            <Navbar.Link href="#">Team</Navbar.Link>
            <Navbar.Link href="#">Activity</Navbar.Link>
            <Navbar.Link href="#">Settings</Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
        <Navbar.Content
          css={{
            
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
            onClick = {onSearchTerms}
          >
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} onClick = {onSearchTerms} css={{cursor: 'pointer'}}/>
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              
              value = {searchItems}
              onChange = {(e) => setSearchItem(e.target.value)}
              placeholder="Busqueda..."
            />
          </Navbar.Item>
          
        </Navbar.Content>
      </Navbar>
    

      

      <NextLink href="/favorites" passHref>
        <Link css={{marginLeft:'10px'}}>
          <Text color="white" >
            
            Favoritos
          </Text>
        </Link>
      </NextLink>

    </Navbar>
 
  );
};

export default CustomNavBar;
