title: WVAT
author: Rui Alves
code: default

---
class: title

# WVAT

Automating web software version auditing with WVAT

---
class: whoami

# $ whoami

![Foto](foto.jpg)

My name is **Rui Alves** and I'm a Computer Engineering MSc (4/5 years) student @FEUP

I like software development in general and I play a lot of chess. I do mostly web development and random programming challenges.

You can find my projects at [github.com/xRuiAlves](https://github.com/xRuiAlves)

**DISCLAIMER:** I'm not a security guy!

I'm also part of the 75% of people that are afraid to speak in public ![](smile.png)

---
class: whatis

# What is WVAT

WVAT (**W**eb **V**ulnerability **A**ssessment **T**ool) is an **open-source** CLI tool to analyse a domain, its subdomains and respective pages, extracting the used technologies to find their **vulnerabilities** in order to cross-reference them with known exploits.

![Architecture](architecture.png)

To perform these tasks, various different tools are used! We'll get to that later.

---
class: project-context

# Some Context

This project was proposed as part of the Software Development Lab course @MIEIC, FEUP (4th year, 1st semester course).

The proposers were **João Pedro Dias**, **Pedro Sousa** and **Luís Catarino** (special props to **João Pedro Dias**, who helped us a lot during development), security professionals and/or enthusiasts, as they realized that there was no similar aggregated solution for the problems this tool solves.

![LDSO Course](ldso.png)

**Side Note:** The [**LDSO course**](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=436457) allows random people to propose projects for students to tackle. You can contact the course's teachers if you have a project to propose (you can talk to me after the presentation for more info)

---
class: team

# The Team

The team consisted of **9 people**, all from MIEIC.

![Team](team.png)

---
class: team

# The Team

The team consisted of ~~9 people~~ **8 people**, all from MIEIC.

![Team](team_2.png)

---
class: team

# The Team

The team consisted of ~~9 people~~ ~~8 people~~ **7 people**, all from MIEIC.

![Team](team_3.png)

---
class: title hacking

# Hacking time!

![Hacking](hacking.gif)

---
class: domain-analysis

# Let's analyse my own Domain, [ruialves.me](https://ruialves.me)

```
./wvat analyse ruialves.me \
--crawlingTimeout 45 \
--timeout 300 \
--depth 3 \
--verbose \
--graph \
--config wvat-config.json
```

If everything goes well, 4 subdomains should be found and analysed! If not, I'll probably think about some good excuse! ![](upside_down.png)

---
class: technologies

# Stuff we used

## Tool development

The whole tool was built using `NodeJS` (sorry, we didn't use Python ![](sweat_smile.png)). We also used the `oclif` CLI framework to make the user interface development easier.

## Crawling

To crawl the domain subdomains, we used `amass`, by calling the binary directly and parsing the generated output.

To crawl all subdomains pages, we used `js-crawler` (a pretty cool node module).

Especially for bigger crawling depths, this process can take a LONG time. For that reason, it's good to allow some sort of caching. We are using the `node-persist` module to store crawling results, which can be optionally reused.

---
class: technologies

# Stuff we used

## Page technology fingerprint

To find technologies present in a webpage, we used multiple sources and intersected the data (to allow finding more technologies and have better versioning info):

- `Wappalyser` - the node module version
- `Webtech` - using the binary directly and parsing the generated output
- `Toolbar Netcraft` - scraping the web page to get results

## Searching technologies vulnerabilities

We're using [cve mitre](https://cve.mitre.org/) as vulnerabilities database. Since they allow full database downloading, to make the process faster, the database is downloaded on tool usage and parsed (removing headers plus some minor tweaks), being used as a local cache.

To do a full-text-search-sort-of-thing on the technology, we are using egrep (grep with regex) with some tweaks. This actually provides very good results in little execution time!

---
class: technologies

# Stuff we used

## Matching vulnerabilities with exploits

There are many cool exploit databases out there. In this part we just provide links to the databases that may contain relevant exploits to the found CVEs:

- [exploit-db.com](https://www.exploit-db.com/)
- [rapid7.com](https://www.rapid7.com/)
- [circl.lu](https://www.circl.lu/)

## Others

Some minor network analysis is also made to the domain, in order to find location info, DNS information, IPs, *et cetera*.

The tool's behaviour can be manipulated with a [configuration file](wvat-config.json).

---

# Results Reporting

It's important to provide a good way to visualize the results. For that reason, an `HTML Report` is built after the tool terminates the analysis.

A report from a sample analysis can be found [here](report.html).

Moreover, to make integrations with other tools easier, we also provide a `JSON` format alternative (which is much more machine-friendly than html).

We also use an `amass` option to generate a cool network graph! A network graph page from another sample analysis can be found [here](network_graph.html).

---
class: list-page

# Main challenges in the development

- At first, it was quite **hard to understand the scope of the project** (mainly due to our lack of knowledge) - seriously, we had no idea what we were doing;
- This tool (in its current state), to work properly, is **very reliable on a good internet connection**;
- There were **many different options to explore**, when it comes to crawling, tech fingerprinting, vulnerabilities and exploits analysis. I mean, a LOT;
- Too many features, **too little time**!
- This wasn't only a project's development - there was the whole "Curricular Unit" thing.

---
class: list-page-2

# Future work

- **The tool is not scalable** - currently, there is no thread pool limitation, so it eats memory like cereal;
- Due to little time, there is **not enough documentation**, which makes it harder to contribute;
- It would be nice if it was possible to integrate more different tools in the various tool's steps, to get better and more meaningful results;
- It could be interesting to use different HTTP methods on the found endpoints (especially when analysis API related domains);
- Currently, **no authentication or HTTP headers specification is allowed**. Adding this feature would highly improve crawling results;
- **Not enough Unit Tests** to cover all business logic in the codebase;
- Also due to little time, there is actually **repeated code** in some parts of the project, so some refactoring is in order.

---
class: title

# Thank you!

Do feel free to ask questions!

You may contribute to the tool at 

[github.com/tempto/wvat](https://github.com/tempto/wvat)

This presentation is available at

[wvat-presentation.ruialves.me](https://wvat-presentation.ruialves.me)