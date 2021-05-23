<template>
  <div>
    <navigation />
    <b-container class="mt-4 mb-4 shadow p-4">
      <h4>About DIMMAS</h4>

      <p class="text-justify ">
        Dengue, or dengue fever, is an infectious disease that is spread by
        every dengue virus that bites. Dengue patients typically have fever,
        fatigue, rash, nausea, vomiting, pain and aches. In certain cases,
        dengue will escalate to an extreme type called severe dengue (formerly
        known as dengue hemorrhagic fever), with or without hemorrhage marked by
        plasma leakage. With or without shock characteristics, extreme
        hemorrhage or severe organ impairment can occur.
      </p>
      <p class="text-justify ">
        Thailand has spread dengue fever for more than sixty years, dengue
        patients are still found in every province and spread to different
        areas. In Malaysia, dengue also has a major cause of morbidity and
        mortality. In Vietnam, dengue has been estimated to cause a substantial
        health and economic burden. One of the counter measures that were
        identified by Ratuanan, 2019 is by using a mosquito repellant and
        constantly cleaning the house surroundings while Barde 2018 says, timely
        diagnosis and prompt vector control activities can prevent dengue
        outbreaks through the enhancement diagnostic capabilities at local level
        and use new technologies such as mobile phones and internet to
        strengthen health systems to curb DEN.
      </p>

      <p class="text-justify ">
        An invention called ThaiDengue has been used in Thailand to forecast,
        create a GPS map of dengue outbreaks, and create a dengue monitoring
        calendar. This consists of the main menu: how to use, forecast,
        surveillance calendar, warning, disease map, alert patients, contact the
        vector-borne Bureau, awareness detail, and scan the QR code (Somboonsak,
        2020). Meanwhile, a study conducted in Bangladesh used the Dengue
        Tracker Device in which the potential infectious locations can be
        submitted by the infected patients and the conscious resident. It is the
        same with the study conducted by Benablo, 2018 which they have developed
        a web and android application that would visualize the prevalence of
        dengue cases in a given locality on a map and could register dengue
        cases.
      </p>

      <p class="text-justify ">
        In the Philippines, dengue outbreaks in recent years have been
        increasingly strong which reported 74 699 dengue cases and 294 deaths in
        2020 as of 31 October. The number of cases is 81% lower compared to the
        396 932 cases that were reported in the same period in 2019. Meanwhile,
        DOH warns reminds the public to do the 4-S against dengue. Francisco T.
        Duque III, DOH Secretary emphasized that “it is important to remove any
        space or container that can hold unnecessary stagnant water which may
        become breeding sites of mosquitoes,”. In the other hand, The DOST-ITDI
        OL trap research team designed the trap to detect, monitor, and control
        the population of the dengue-carrying Aedes aegypti mosquitoes. The trap
        works by attracting female mosquitoes to lay eggs on the paddle drenched
        with an organic solution. There are several experiments and advances to
        examine the prevalence of dengue have been among the many steps taken to
        resolve this issue. However, with insufficient access to accurate and
        updated evidence, the consequences of these efforts have always
        addressed only a fraction of the entire epidemic, leaving the broader
        population at risk of contamination.
      </p>

      <p class="text-justify ">
        The Cauayan City was chosen as a place of study wherein conducted
        research was done through data gathering in the Cauayan City Health
        Office. Based from the data gathered there are (1) no data basis for
        prevention and control management of dengue cases – the LGU has been
        implementing dengue prevention measures in the city every year. However,
        there is no compound data that can be subjected for policy or IRR
        creation for the improvement of the dengue control and management in the
        municipality, and (2) no accurate information about dengue related cases
        has been kept and organized in each barangay which compromises the cost
        effectiveness of dengue control management. To address this issue, the
        researcher’s aimed to design, develop, and implement DIMMAS (Dengue
        Information Management and Mapping System) for the City of Cauayan.
        Features will include Geotagging of dengue cases, real time dashboard
        monitoring, notification system for barangay preventive measures, user
        notification of dengue risk (low, moderate, high) based on geological
        locations, and online information dissemination.
      </p>
    </b-container>

    <b-container class="mt-2 mb-5 shadow p-4">
      <h4>Developers</h4>

      <b-row>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <b-card no-body class="overflow-hidden " style="max-width:100%;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  :src="require('../assets/glydell.jpg')"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body title="Glydell T. Ancheta">
                  <hr />
                  <p class="m-0 p-0" style="font-size:.9rem">
                    Contact Number :
                  </p>
                  <p class="m-0 p-0 text-primary" style="font-size:.9rem">
                    09656689897
                  </p>
                  <hr />
                  <p class="m-0 p-0" style="font-size:.9rem">Email :</p>
                  <p class="m-0 p-0 text-primary" style="font-size:.9rem">
                    ancheta.glygly15@gmail.com
                  </p>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <b-card no-body class="overflow-hidden " style="max-width:100%;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  :src="require('../assets/lovely.jpg')"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body title="Lovely Anne M. Felipe">
                  <hr />
                  <p class="m-0 p-0" style="font-size:.9rem">
                    Contact Number :
                  </p>
                  <p class="m-0 p-0 text-primary" style="font-size:.9rem">
                    09568948830
                  </p>
                  <hr />
                  <p class="m-0 p-0" style="font-size:.9rem">Email :</p>
                  <p class="m-0 p-0 text-primary" style="font-size:.9rem">
                    felipelovely04@gmail.com
                  </p>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Navigation from "../components/Navigation";

export default {
  components: {
    Navigation,
    Footer
  }
};
</script>
